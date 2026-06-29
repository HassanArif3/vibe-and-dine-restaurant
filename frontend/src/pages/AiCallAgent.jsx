import { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Trash2, 
  Edit, CheckCircle, RefreshCw, User, MapPin, Sparkles, Send, Key, AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import useSpeechRecognition from '../context/useSpeechRecognition';
import useSpeechSynthesis from '../context/useSpeechSynthesis';
import './AiCallAgent.css';

// Glowing Soundwave Visualizer Sub-component
const VoiceVisualizer = ({ isCalling, isSpeaking, isListening, isMuted }) => {
  if (!isCalling) {
    return (
      <div className="agent-avatar-container">
        <div className="agent-avatar">S</div>
      </div>
    );
  }

  // Active call waves
  let waveColor = '#4CAF50'; // Default connected/active
  let animDuration = '1.2s';
  
  if (isMuted) {
    waveColor = '#ef4444'; // Red for muted
  } else if (isSpeaking) {
    waveColor = 'var(--secondary-color)'; // Speaking color
    animDuration = '0.6s';
  } else if (isListening) {
    waveColor = '#eab308'; // Yellow for listening
    animDuration = '0.9s';
  }

  return (
    <div className="agent-avatar-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div className="agent-avatar" style={{ transform: isSpeaking ? 'scale(1.08)' : 'scale(1.0)', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        S
      </div>
      
      {/* Glowing sound wave */}
      <svg height="45" width="160" style={{ overflow: 'visible', filter: `drop-shadow(0px 0px 8px ${waveColor})` }}>
        <g fill={waveColor}>
          {[...Array(9)].map((_, i) => {
            let baseHeight = isMuted ? 4 : (i % 2 === 0 ? 12 : 24);
            let animateTag = null;
            let animateY = null;
            
            if (isCalling && !isMuted && (isSpeaking || isListening)) {
              let minH = 4;
              let maxH = i % 2 === 0 ? 28 : 42;
              animateTag = (
                <animate
                  attributeName="height"
                  values={`${baseHeight}; ${maxH}; ${minH}; ${baseHeight}`}
                  dur={animDuration}
                  repeatCount="indefinite"
                  begin={`${i * 0.08}s`}
                />
              );
              animateY = (
                <animate
                  attributeName="y"
                  values={`${22 - baseHeight / 2}; ${22 - maxH / 2}; ${22 - minH / 2}; ${22 - baseHeight / 2}`}
                  dur={animDuration}
                  repeatCount="indefinite"
                  begin={`${i * 0.08}s`}
                />
              );
            }
            
            return (
              <rect
                key={i}
                x={12 + i * 16}
                y={22 - baseHeight / 2}
                width="6"
                height={baseHeight}
                rx="3"
                style={{ transition: 'all 0.3s ease' }}
              >
                {animateTag}
                {animateY}
              </rect>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

const AiCallAgent = () => {
  const { addToCart, cart: globalCart, clearCart } = useContext(AppContext);
  
  // Call State
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callState, setCallState] = useState('idle'); // idle, greeting, ordering, collecting_info, confirming, placed
  
  // Audio Controls
  const [isMuted, setIsMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);

  // Configuration Settings
  const [engineMode, setEngineMode] = useState('local'); // local | gemini
  const [apiKey, setApiKey] = useState('');
  const [agentPersona, setAgentPersona] = useState('sajid'); // sajid | ayesha
  const [language, setLanguage] = useState('ur'); // ur | en
  
  // Conversations Logs
  const [transcript, setTranscript] = useState([]);
  const [inputText, setInputText] = useState('');
  
  // Interactive Cart & Details
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [placedOrderInfo, setPlacedOrderInfo] = useState(null);

  // Menu items list
  const [menuItems, setMenuItems] = useState([]);

  // Refs
  const timerRef = useRef(null);
  const transcriptEndRef = useRef(null);

  // Load API Key from local storage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gathering_gemini_key');
    if (savedKey) {
      setApiKey(savedKey);
      setEngineMode('gemini');
    }

    // Check backend API config to see if Gemini is enabled on server
    const checkBackendConfig = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ai/config', { timeout: 800 });
        if (res.data && res.data.geminiEnabled) {
          console.log('Gemini API is enabled on backend server, defaulting to Gemini Mode.');
          setEngineMode('gemini');
        }
      } catch (err) {
        console.log('Could not check backend configuration, defaulting to local mode.', err);
      }
    };
    checkBackendConfig();

    // Fetch Menu items
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/menu', { timeout: 800 });
        setMenuItems(res.data);
      } catch (err) {
        console.log('Backend not available, using fallback menu items', err);
        setMenuItems([
          { _id: '1', name: 'Beef Smash Burger', description: 'Hand-pressed caramelized beef patties with signature sauce and premium cheese.', price: 750, category: 'Smash Burgers' },
          { _id: '2', name: 'Chicken Smash Burger', description: 'Crispy, juicy hand-pressed chicken patty for chicken lovers.', price: 650, category: 'Smash Burgers' },
          { _id: '3', name: 'Crown Crust Pizza', description: 'Stunning premium pizza with a cheese-stuffed crust crown on organic whole grain dough.', price: 1500, category: 'Pizzas' },
          { _id: '4', name: 'Crispy Spring Rolls', description: 'The ultimate snack attack. Crunchy rolls packed with savory fillings.', price: 350, category: 'Appetizers' },
          { _id: '5', name: 'Loaded Fries', description: 'Crispy fries generously seasoned and topped with melted cheese and signature sauces.', price: 450, category: 'Sides' },
          { _id: '6', name: 'Gathering Group Deal', description: 'Value deal for 5 persons including burgers, pizza, and drinks. (Promotional)', price: 1250, category: 'Deals' }
        ]);
      }
    };
    fetchMenu();
  }, []);

  // Speech Hooks Integration
  const { 
    isListening: isRecListening, 
    startListening, 
    stopListening 
  } = useSpeechRecognition({
    onResult: (text) => handleUserUtterance(text),
    onError: (err) => console.error("Speech Recognition Error: ", err),
    language
  });

  const { 
    isSpeaking: isSynSpeaking, 
    speakText, 
    cancelSpeaking 
  } = useSpeechSynthesis({
    speakerOn,
    agentPersona,
    language
  });

  // Sync scroll on transcript updates
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcript]);

  // Call duration timer
  useEffect(() => {
    if (isCalling) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isCalling]);

  // Reactive Voice Recognition Toggling
  useEffect(() => {
    if (isCalling && !isMuted) {
      if (isSynSpeaking) {
        stopListening();
      } else {
        const timer = setTimeout(() => {
          startListening();
        }, 300);
        return () => clearTimeout(timer);
      }
    } else {
      stopListening();
    }
  }, [isCalling, isMuted, isSynSpeaking]);

  // Save API key
  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gathering_gemini_key', key);
    alert('API Key Saved! Gemini API Mode enabled.');
    setEngineMode('gemini');
  };

  const clearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('gathering_gemini_key');
    setEngineMode('local');
    alert('API Key Removed. Switched to Local Smart Mode.');
  };

  // Start the simulated phone call
  const startCall = () => {
    setIsCalling(true);
    setCart([]);
    setCustomerInfo({ name: '', phone: '', address: '' });
    setCallState('greeting');
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const greetingMsg = language === 'ur' 
      ? 'Welcome to Gathering Restaurant! (Gathering Restaurant me khushamdeed!) Main Sajid hoon, aapka AI assistant. Aaj aap kya order karna chahenge?'
      : 'Welcome to Gathering Restaurant! I am your AI assistant. What would you like to order today?';

    setTranscript([
      { sender: 'system', text: 'Call started at ' + time, time },
      { sender: 'agent', text: greetingMsg, time }
    ]);

    // Speak initial greeting
    setTimeout(() => {
      speakText(greetingMsg);
    }, 450);
  };

  // End the call
  const endCall = () => {
    setIsCalling(false);
    stopListening();
    cancelSpeaking();
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTranscript(prev => [...prev, { sender: 'system', text: 'Call ended.', time }]);
    setCallState('idle');
  };

  // Process customer speech/text
  const handleUserUtterance = async (userInputText) => {
    if (!userInputText.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTranscript(prev => [...prev, { sender: 'customer', text: userInputText, time }]);

    if (engineMode === 'gemini') {
      await handleGeminiEngine(userInputText, time);
    } else {
      await handleLocalEngine(userInputText, time);
    }
  };

  // Chat/Text message sender fallback
  const sendChatMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const msg = inputText;
    setInputText('');
    handleUserUtterance(msg);
  };

  // -------------------------------------------------------------
  // Conversational Engines
  // -------------------------------------------------------------

  // Gemini API Powered conversational agent
  const handleGeminiEngine = async (text, time) => {
    const chatHistory = transcript.map(t => ({
      role: t.sender === 'customer' ? 'user' : 'model',
      parts: [{ text: t.text }]
    })).filter(h => h.role === 'user' || h.role === 'model');

    chatHistory.push({
      role: 'user',
      parts: [{ text: text }]
    });

    try {
      let parsedData;

      try {
        const response = await fetch(
          'http://localhost:5000/api/ai/chat',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              chatHistory,
              menuItems
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          parsedData = data;
        } else if (response.status === 400) {
          const errData = await response.json();
          console.warn('Backend Gemini key missing:', errData.error);
          
          if (apiKey) {
            parsedData = await callGeminiDirectly(chatHistory);
          } else {
            throw new Error('backend_key_missing');
          }
        } else {
          throw new Error('backend_server_error');
        }
      } catch (backendError) {
        if (backendError.message === 'backend_key_missing') {
          throw backendError;
        }
        console.warn('Backend proxy failed, trying direct browser call:', backendError);
        if (apiKey) {
          parsedData = await callGeminiDirectly(chatHistory);
        } else {
          throw new Error('no_keys_configured');
        }
      }

      if (parsedData.cart) setCart(parsedData.cart);
      if (parsedData.customerInfo) setCustomerInfo(parsedData.customerInfo);
      if (parsedData.callState) setCallState(parsedData.callState);

      setTranscript(prev => [...prev, { sender: 'agent', text: parsedData.response, time }]);
      
      speakText(parsedData.response, () => {
        if (parsedData.callState === 'placed') {
          submitOrderDirectly(parsedData.cart, parsedData.customerInfo);
        }
      });

    } catch (error) {
      console.error('Gemini API call error:', error);
      let errorResponse = 'Sorry, there was a connection error. Can you please repeat that?';
      if (error.message === 'backend_key_missing' || error.message === 'no_keys_configured') {
        errorResponse = 'Gemini API Key is missing. Please add GEMINI_API_KEY to the backend .env file or enter a key in the settings panel to use Gemini Mode.';
      }
      setTranscript(prev => [...prev, { sender: 'agent', text: errorResponse, time }]);
      speakText(errorResponse);
    }
  };

  const callGeminiDirectly = async (chatHistory) => {
    const systemPrompt = `You are "Sajal", the voice agent for "Gathering Restaurant".
The menu list is:
${JSON.stringify(menuItems, null, 2)}

Your job is to take customer orders over the phone.
Guidelines:
1. You must understand and speak English and Urdu (including Roman Urdu, e.g. "ek smash burger aur fries kar do"). Respond in the language preferred by the customer.
2. Keep spoken responses short, natural, and conversational for a phone call (avoid long paragraphs).
3. Help the customer add items, increase/decrease quantities, or remove items.
4. Once items are selected, ask for their delivery details: Name, Phone number, and Delivery Address.
5. Once all details are collected, repeat the order items, prices, name, phone, and address to confirm. Ask: "Is this correct?".
6. If the customer explicitly confirms the summary, set callState to "placed".

You MUST output your response ONLY as a valid JSON object matching this schema. Do not enclose it in markdown formatting (like \`\`\`json):
{
  "response": "What you speak out loud to the customer (keep it natural, short, and bilingual if appropriate)",
  "cart": [
    { "_id": "item_id", "name": "item_name", "price": 123, "quantity": 1 }
  ],
  "customerInfo": {
    "name": "Customer Name",
    "phone": "Customer Phone",
    "address": "Customer Address"
  },
  "callState": "greeting" | "ordering" | "collecting_info" | "confirming" | "placed"
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: chatHistory,
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          generationConfig: {
            responseMimeType: 'application/json'
          }
        })
      }
    );

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    const rawText = data.candidates[0].content.parts[0].text;
    return JSON.parse(rawText.trim());
  };

  const handleLocalEngine = async (text, time) => {
    const lowercaseText = text.toLowerCase();
    let reply = '';
    let nextState = callState;

    const parseLocalText = (text, menu, currentCart, currentInfo) => {
      const lowercaseText = text.toLowerCase();
      let updatedInfo = { ...currentInfo };
      
      const phoneMatch = lowercaseText.replace(/[-\s]/g, '').match(/(03\d{9})|(\d{10,11})/);
      if (phoneMatch) {
        updatedInfo.phone = phoneMatch[0];
      }

      if (lowercaseText.includes('naam hai') || lowercaseText.includes('naam hy') || lowercaseText.includes('name is') || lowercaseText.includes('naam check') || lowercaseText.includes('mera naam')) {
        const words = lowercaseText.split(/\s+/);
        const idx = words.findIndex(w => w === 'naam' || w === 'name');
        if (idx !== -1 && idx + 1 < words.length) {
          let candidate = words[idx + 1];
          if (candidate === 'hai' || candidate === 'is' || candidate === 'hy' || candidate === 'mera') {
            if (idx + 2 < words.length) candidate = words[idx + 2];
          }
          if (candidate === 'hai' || candidate === 'is' || candidate === 'hy') {
            if (idx + 3 < words.length) candidate = words[idx + 3];
          }
          if (candidate && candidate.length > 2) {
            updatedInfo.name = candidate.charAt(0).toUpperCase() + candidate.slice(1);
          }
        }
      }

      const addressMarkers = ['address is', 'address hai', 'address hy', 'delivery to', 'rehta hoon', 'rehti hoon', 'house', 'phase', 'sector', 'street', 'karachi', 'lahore', 'islamabad'];
      for (const marker of addressMarkers) {
        const idx = lowercaseText.indexOf(marker);
        if (idx !== -1) {
          let rawAddr = text.slice(idx + marker.length).trim();
          rawAddr = rawAddr.replace(/^(is|hai|hy|aur|and|mein|in)\s+/i, '');
          if (rawAddr.length > 5) {
            updatedInfo.address = rawAddr;
            break;
          }
        }
      }

      const parseQuantity = (words, index) => {
        const numberMap = {
          'ek': 1, 'do': 2, 'teen': 3, 'chaar': 4, 'panch': 5, 'che': 6, 'saat': 7, 'aath': 8, 'nau': 9, 'das': 10,
          'ایک': 1, 'دو': 2, 'تین': 3, 'چار': 4, 'پانچ': 5, 'چھ': 6, 'سات': 7, 'آٹھ': 8, 'نو': 9, 'دس': 10,
          'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
          '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10
        };

        for (let offset = -2; offset < 0; offset++) {
          const targetIdx = index + offset;
          if (targetIdx >= 0 && words[targetIdx]) {
            const word = words[targetIdx].toLowerCase();
            if (numberMap[word]) return numberMap[word];
          }
        }

        for (let offset = 1; offset <= 2; offset++) {
          const targetIdx = index + offset;
          if (targetIdx < words.length && words[targetIdx]) {
            const word = words[targetIdx].toLowerCase();
            if (numberMap[word]) return numberMap[word];
          }
        }

        return 1;
      };

      let newCart = [...currentCart];
      const words = lowercaseText.split(/[\s,.\u060C]+/);

      const menuKeywords = [
        { id: '1', keywords: ['beef smash', 'smash burger', 'beef burger', 'smash', 'beef', 'بیف', 'سمیش', 'برگر'] },
        { id: '2', keywords: ['chicken smash', 'chicken burger', 'murgi burger', 'chicken', 'چکن'] },
        { id: '3', keywords: ['crown crust', 'crown pizza', 'pizza', 'crust pizza', 'پیزا', 'کراؤن'] },
        { id: '4', keywords: ['spring rolls', 'spring roll', 'rolls', 'roll', 'رول'] },
        { id: '5', keywords: ['loaded fries', 'fries', 'chips', 'french fries', 'فرائز', 'چپس'] },
        { id: '6', keywords: ['gathering deal', 'group deal', 'deal', 'ڈیل', 'پیکیج'] }
      ];

      let detectedAnyItem = false;

      menuKeywords.forEach(menuKeyword => {
        let matchedIndex = -1;
        for (let k of menuKeyword.keywords) {
          const idx = words.findIndex(w => w.includes(k) || k.includes(w));
          if (idx !== -1) {
            matchedIndex = idx;
            break;
          }
        }

        if (matchedIndex !== -1) {
          const qty = parseQuantity(words, matchedIndex);
          const menuItem = menu.find(item => item._id === menuKeyword.id);
          
          if (menuItem) {
            detectedAnyItem = true;
            const existingIdx = newCart.findIndex(i => i._id === menuItem._id);
            if (existingIdx !== -1) {
              newCart[existingIdx].quantity += qty;
            } else {
              newCart.push({ ...menuItem, quantity: qty });
            }
          }
        }
      });

      return { newCart, updatedInfo, detectedAnyItem };
    };

    const { newCart, updatedInfo, detectedAnyItem } = parseLocalText(lowercaseText, menuItems, cart, customerInfo);
    setCart(newCart);
    setCustomerInfo(updatedInfo);

    const totalItemsCount = newCart.reduce((sum, item) => sum + item.quantity, 0);

    if (callState === 'greeting' || callState === 'ordering') {
      if (detectedAnyItem) {
        nextState = 'ordering';
        reply = language === 'ur'
          ? `Theek hai, maine aap ke order me cheezein add kar di hain. Aapka total abhi ${newCart.reduce((sum, item) => sum + item.price * item.quantity, 0)} Rupees hai. Kya kuch aur chahiye?`
          : `Got it, I have updated your cart. Your current subtotal is Rs. ${newCart.reduce((sum, item) => sum + item.price * item.quantity, 0)}. Would you like to add anything else?`;
      } else if (lowercaseText.includes('confirm') || lowercaseText.includes('bas') || lowercaseText.includes('place') || lowercaseText.includes('checkout') || lowercaseText.includes('no') || lowercaseText.includes('nahi') || lowercaseText.includes('order kar do')) {
        if (totalItemsCount === 0) {
          reply = language === 'ur'
            ? 'Aapke order me koi item nahi hai. Pehle kya khana pasand karenge?'
            : 'Your cart is empty. Please select some menu items first!';
        } else {
          nextState = 'collecting_info';
          if (!updatedInfo.name) {
            reply = language === 'ur'
              ? 'Meherbani karke apna naam batayein?'
              : 'Could you please tell me your name?';
          } else if (!updatedInfo.phone) {
            reply = language === 'ur'
              ? `Shukriya ${updatedInfo.name}. Aapka mobile number kya hai?`
              : `Thank you ${updatedInfo.name}. What is your phone number?`;
          } else if (!updatedInfo.address) {
            reply = language === 'ur'
              ? 'Aur aapka delivery address kya hai?'
              : 'And what is your delivery address?';
          } else {
            nextState = 'confirming';
            const cartSummary = newCart.map(i => `${i.quantity} ${i.name}`).join(', ');
            reply = language === 'ur'
              ? `Perfect! Aapka order hai: ${cartSummary}. Delivering to ${updatedInfo.name} at ${updatedInfo.address}, phone number ${updatedInfo.phone}. Is this correct? (Kya ye details sahi hain?)`
              : `Perfect! Your order is: ${cartSummary}. Delivering to ${updatedInfo.name} at ${updatedInfo.address}, phone number ${updatedInfo.phone}. Is this correct?`;
          }
        }
      } else {
        reply = language === 'ur'
          ? 'Hamare pass Smash Burgers, Pizzas, Loaded Fries, aur spring rolls hain. Aap kya mangwana chahenge?'
          : 'We have Delicious Smash Burgers, Pizzas, Crispy Rolls, and Loaded Fries. What would you like?';
      }
    } 
    
    else if (callState === 'collecting_info') {
      if (!updatedInfo.name) {
        reply = language === 'ur' ? 'Meherbani karke apna naam batayein?' : 'Please tell me your name?';
      } else if (!updatedInfo.phone) {
        reply = language === 'ur' 
          ? `Shukriya ${updatedInfo.name}. Aapka contact number kya hai?` 
          : `Thank you ${updatedInfo.name}. What is your contact number?`;
      } else if (!updatedInfo.address) {
        reply = language === 'ur' ? 'Aur aapka delivery address kya hai?' : 'And what is your delivery address?';
      } else {
        nextState = 'confirming';
        const cartSummary = newCart.map(i => `${i.quantity} ${i.name}`).join(', ');
        reply = language === 'ur'
          ? `Aapka order hai: ${cartSummary}. Delivery details: ${updatedInfo.name}, Address: ${updatedInfo.address}, Phone: ${updatedInfo.phone}. Kya main order place kar doon?`
          : `Your order consists of: ${cartSummary}. Delivering to ${updatedInfo.name} at ${updatedInfo.address}, Phone: ${updatedInfo.phone}. Should I place this order?`;
      }
    } 
    
    else if (callState === 'confirming') {
      if (lowercaseText.includes('yes') || lowercaseText.includes('haan') || lowercaseText.includes('sahi') || lowercaseText.includes('thik') || lowercaseText.includes('correct') || lowercaseText.includes('confirm') || lowercaseText.includes('kar do')) {
        nextState = 'placed';
        reply = language === 'ur'
          ? 'Bohat shukriya! Aapka order place ho gaya hai aur 30 se 40 minutes me deliver ho jayega. Allah Hafiz!'
          : 'Thank you! Your order has been successfully placed. It will arrive in 30-40 minutes. Have a wonderful day!';
      } else {
        nextState = 'ordering';
        reply = language === 'ur'
          ? 'Koi baat nahi. Aap order me kya tabdeeli karna chahte hain?'
          : 'No worries. What would you like to change in your order?';
      }
    }

    setCallState(nextState);
    setTranscript(prev => [...prev, { sender: 'agent', text: reply, time }]);
    
    speakText(reply, () => {
      if (nextState === 'placed') {
        submitOrderDirectly(newCart, updatedInfo);
      }
    });
  };

  const submitOrderDirectly = async (finalCart, finalInfo) => {
    const totalAmount = finalCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderData = {
      items: finalCart,
      totalAmount,
      deliveryAddress: finalInfo.address || 'Address taken on call',
      phone: finalInfo.phone || '0000000000',
      user: null
    };

    try {
      const res = await axios.post('http://localhost:5000/api/orders', orderData);
      setPlacedOrderInfo(res.data);
      setShowSuccessModal(true);
      
      finalCart.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          addToCart(item);
        }
      });
      
      endCall();
    } catch (err) {
      console.error('Failed to submit order:', err);
      const mockOrder = {
        _id: 'ORDER_' + Math.floor(Math.random() * 900000 + 100000),
        items: finalCart,
        totalAmount,
        deliveryAddress: finalInfo.address || 'Mock Address',
        phone: finalInfo.phone || '0300-1234567',
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      setPlacedOrderInfo(mockOrder);
      setShowSuccessModal(true);
      endCall();
    }
  };

  const totalSub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharges = totalSub > 0 ? 150 : 0;
  const tax = Math.round(totalSub * 0.05); // 5% GST
  const grandTotal = totalSub + deliveryCharges + tax;

  return (
    <>
      <div className="header-spacer"></div>
      
      {/* Settings Panel */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="settings-banner">
            <div className="settings-group">
              <span className="settings-label">Engine:</span>
              <select 
                className="settings-select" 
                value={engineMode} 
                onChange={(e) => setEngineMode(e.target.value)}
                disabled={isCalling}
              >
                <option value="local">Local Smart Agent (No Key)</option>
                <option value="gemini">Gemini API Mode (Advanced)</option>
              </select>
            </div>

            <div className="settings-group">
              <span className="settings-label">Language:</span>
              <select 
                className="settings-select" 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                disabled={isCalling}
              >
                <option value="ur">Roman Urdu / Script</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="settings-group">
              <span className="settings-label">Voice Persona:</span>
              <select 
                className="settings-select" 
                value={agentPersona} 
                onChange={(e) => setAgentPersona(e.target.value)}
                disabled={isCalling}
              >
                <option value="sajid">Sajid (Friendly Waiter)</option>
                <option value="ayesha">Ayesha (Swift Assistant)</option>
              </select>
            </div>

            <div className="key-input-wrapper">
              <span className="settings-label" style={{ display: 'flex', alignItems: 'center' }}>
                <Key size={16} style={{ marginRight: '6px' }} /> Client Key (Backup):
              </span>
              <input 
                type="password" 
                className="key-input" 
                placeholder={apiKey ? "••••••••••••••••••••••••" : "Optional client-side key..."}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={isCalling}
              />
              {apiKey ? (
                <button className="key-btn" onClick={clearApiKey}>Clear</button>
              ) : (
                <button className="key-btn" onClick={() => saveApiKey(apiKey)}>Save</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Calling Interface */}
      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          <div className="agent-container">
            
            {/* Left: The Phone Card */}
            <div className={`phone-card ${isCalling ? 'active-call' : ''} ${isSynSpeaking ? 'speaking' : ''}`}>
              <div className="agent-header">
                <span className="subtitle" style={{ color: isCalling ? '#4CAF50' : 'var(--primary-color)' }}>
                  {isCalling ? 'Active Session' : 'Gathering AI order agent'}
                </span>
                <h2>{agentPersona === 'sajid' ? 'Sajid AI Agent' : 'Ayesha AI Agent'}</h2>
                
                {isCalling ? (
                  <div className={`call-status ${isSynSpeaking ? 'speaking' : 'active'}`}>
                    <span className="status-dot"></span>
                    {isSynSpeaking ? 'Speaking...' : isRecListening ? 'Listening...' : 'Connected'}
                  </div>
                ) : (
                  <div className="call-status">
                    <span className="status-dot"></span> Offline
                  </div>
                )}

                {isCalling && (
                  <div className="call-timer">
                    {Math.floor(callDuration / 60).toString().padStart(2, '0')}:
                    {(callDuration % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>

              {/* Central Pulsing soundwaves - VoiceVisualizer integration */}
              <VoiceVisualizer 
                isCalling={isCalling} 
                isSpeaking={isSynSpeaking} 
                isListening={isRecListening} 
                isMuted={isMuted} 
              />

              {/* Active Instructions / Feedback */}
              <div style={{ width: '100%', textAlign: 'center' }}>
                <AnimatePresence mode="wait">
                  {isCalling ? (
                    <motion.div 
                      key="active-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p style={{ color: 'var(--text-main)', fontWeight: 500, fontSize: '1.05rem', minHeight: '40px', padding: '0 10px' }}>
                        {isSynSpeaking 
                          ? "Speaking response to customer..." 
                          : isMuted 
                            ? "Microphone is muted" 
                            : "Speak now! Say your order, name, address, or number."}
                      </p>
                      
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                        <Sparkles size={14} style={{ color: 'var(--secondary-color)' }} />
                        <span>Mode: {engineMode === 'gemini' ? 'Gemini API' : 'Local Rule Engine'}</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="inactive-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p style={{ color: 'var(--text-muted)', maxWidth: '300px', margin: '0 auto' }}>
                        Click the green button below to simulate an incoming customer order call.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Call Control Center */}
              <div className="call-controls">
                {isCalling && (
                  <button 
                    className={`control-btn ${isMuted ? 'active' : ''}`} 
                    onClick={() => setIsMuted(!isMuted)}
                    title={isMuted ? "Unmute Mic" : "Mute Mic"}
                  >
                    {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
                  </button>
                )}

                {isCalling ? (
                  <button 
                    className="control-btn btn-call-action end-call" 
                    onClick={endCall}
                    title="Hang up"
                  >
                    <PhoneOff size={30} />
                  </button>
                ) : (
                  <button 
                    className="control-btn btn-call-action" 
                    onClick={startCall}
                    title="Start Customer Call Simulator"
                  >
                    <Phone size={30} />
                  </button>
                )}

                {isCalling && (
                  <button 
                    className={`control-btn ${!speakerOn ? 'active' : ''}`}
                    onClick={() => setSpeakerOn(!speakerOn)}
                    title={speakerOn ? "Mute Speaker" : "Unmute Speaker"}
                  >
                    {speakerOn ? <Volume2 size={22} /> : <VolumeX size={22} />}
                  </button>
                )}
              </div>
            </div>

            {/* Right: The Live Order Sheet Panel */}
            <div className="receipt-paper">
              <div className="receipt-header">
                <div className="receipt-logo">GATHERING</div>
                <div className="receipt-title">AI Call Order Receipt</div>
              </div>

              {/* Live cart list */}
              <div className="receipt-items">
                {cart.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9e9e9e' }}>
                    <AlertCircle size={28} style={{ marginBottom: '8px' }} />
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>No items added yet</p>
                    <p style={{ fontSize: '0.75rem', textAlign: 'center', padding: '0 20px', marginTop: '4px' }}>
                      Speak menu items (e.g. "two beef smash burgers") to add them to receipt.
                    </p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div className="receipt-item" key={item._id}>
                      <div className="receipt-item-info">
                        <span className="receipt-item-name">{item.name}</span>
                        <span className="receipt-item-qty">Rs. {item.price} x {item.quantity}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="receipt-item-price">Rs. {item.price * item.quantity}</span>
                        <button 
                          onClick={() => setCart(prev => prev.filter(i => i._id !== item._id))}
                          style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Delivery info fields parsed dynamically */}
              <div className="customer-details-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delivery Details</h4>
                  <button 
                    onClick={() => setIsEditingInfo(!isEditingInfo)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}
                  >
                    <Edit size={12} /> {isEditingInfo ? 'Lock' : 'Edit'}
                  </button>
                </div>

                {isEditingInfo ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        placeholder="Customer Name"
                        className="chat-input"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        value={customerInfo.name} 
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      />
                      <input 
                        type="text" 
                        placeholder="Phone Number"
                        className="chat-input"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        value={customerInfo.phone} 
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <textarea 
                      placeholder="Delivery Address"
                      className="chat-input"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderRadius: '8px', height: '50px', resize: 'none' }}
                      value={customerInfo.address} 
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                ) : (
                  <>
                    <div className="detail-row">
                      <span className="detail-label"><User size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Name:</span>
                      <span className={`detail-value ${customerInfo.name ? 'highlighted' : 'empty'}`}>
                        {customerInfo.name || 'Not provided yet'}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label"><Phone size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Phone:</span>
                      <span className={`detail-value ${customerInfo.phone ? 'highlighted' : 'empty'}`}>
                        {customerInfo.phone || 'Not provided yet'}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label"><MapPin size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Addr:</span>
                      <span className={`detail-value ${customerInfo.address ? 'highlighted' : 'empty'}`}>
                        {customerInfo.address || 'Not provided yet'}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Totals panel */}
              <div className="receipt-totals">
                <div className="receipt-row">
                  <span>Subtotal:</span>
                  <span>Rs. {totalSub}</span>
                </div>
                <div className="receipt-row">
                  <span>Delivery Charges:</span>
                  <span>Rs. {deliveryCharges}</span>
                </div>
                <div className="receipt-row">
                  <span>GST (5%):</span>
                  <span>Rs. {tax}</span>
                </div>
                <div className="receipt-row total-row">
                  <span>Grand Total:</span>
                  <span>Rs. {grandTotal}</span>
                </div>
              </div>

              {/* Confirm checkout btn manually if they want */}
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', borderRadius: '8px' }}
                disabled={cart.length === 0 || !customerInfo.address || !customerInfo.phone || !customerInfo.name || isCalling}
                onClick={() => submitOrderDirectly(cart, customerInfo)}
              >
                Place Order manually
              </button>
            </div>

          </div>

          {/* Bottom Chat Transcript Logs */}
          <div className="transcript-box">
            <div className="transcript-header">
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={18} className={isSynSpeaking ? 'spin-anim' : ''} /> Call Conversation Log
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isCalling ? 'Live feed active' : 'Offline'}
              </span>
            </div>

            <div className="transcript-messages">
              {transcript.length === 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9e9e9e', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  A live transcript of the call will be shown here.
                </div>
              ) : (
                transcript.map((msg, index) => (
                  <div key={index} className={`message-bubble ${msg.sender}`}>
                    <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '2px', fontWeight: 'bold' }}>
                      {msg.sender.toUpperCase()}
                    </div>
                    <div>{msg.text}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.5, textAlign: 'right', marginTop: '4px' }}>
                      {msg.time}
                    </div>
                  </div>
                ))
              )}
              <div ref={transcriptEndRef} />
            </div>

            {/* Fallback keyboard input form */}
            <form onSubmit={sendChatMessage} className="chat-fallback-form">
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Type customer reply here (fallback if mic is not used)..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={!isCalling}
              />
              <button type="submit" className="chat-send-btn" disabled={!isCalling}>
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && placedOrderInfo && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <CheckCircle size={45} />
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#4CAF50' }}>Order Placed!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              The AI Call Agent has successfully submitted the order to the restaurant kitchen.
            </p>

            <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px', textAlign: 'left', marginBottom: '1.5rem', border: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>
              <p style={{ marginBottom: '4px' }}><strong>Order ID:</strong> {placedOrderInfo._id}</p>
              <p style={{ marginBottom: '4px' }}><strong>Total Amount:</strong> Rs. {placedOrderInfo.totalAmount}</p>
              <p style={{ marginBottom: '4px' }}><strong>Customer:</strong> {customerInfo.name}</p>
              <p style={{ marginBottom: '4px' }}><strong>Phone:</strong> {placedOrderInfo.phone}</p>
              <p style={{ marginBottom: '4px' }}><strong>Address:</strong> {placedOrderInfo.deliveryAddress}</p>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', borderRadius: '8px' }}
              onClick={() => {
                setShowSuccessModal(false);
                setPlacedOrderInfo(null);
                setCart([]);
                setCustomerInfo({ name: '', phone: '', address: '' });
              }}
            >
              Great, thank you!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiCallAgent;
