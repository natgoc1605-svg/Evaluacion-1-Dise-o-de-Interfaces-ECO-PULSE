import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const EcoPulseContext = createContext();

const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignorar
  }
};

function useAudioFeedback() {
  const audioCtxRef = useRef(null);

  const getContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  };

  const playSound = useCallback((type) => {
    try {
      const ctx = getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'toggle') {
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'notification') {
        osc.frequency.value = 600;
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'error') {
        osc.frequency.value = 200;
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {
      // ignorar
    }
  }, []);

  return playSound;
}

export function EcoPulseProvider({ children }) {
  const playSound = useAudioFeedback();

  const [currentDevice, setCurrentDevice] = useState('phone');
  const [isLoggedIn, setIsLoggedIn] = useState(() => loadFromStorage('eco_isLoggedIn', true));
  const [currentUser, setCurrentUser] = useState(() =>
    loadFromStorage('eco_currentUser', {
      name: "Carlos Ramos",
      email: "carlos@ecopulse.com",
      role: "Padre / Administrador"
    })
  );
  const [devices, setDevices] = useState(() =>
    loadFromStorage('eco_devices', [
      { id: 1, name: "Aire Acondicionado", watts: 1200, status: true },
      { id: 2, name: "Refrigerador Eco", watts: 350, status: true },
      { id: 3, name: "Luces Inteligentes", watts: 60, status: false },
      { id: 4, name: "Lavadora", watts: 800, status: false },
      { id: 5, name: "Termo Eléctrico", watts: 1500, status: true },
    ])
  );
  const [phoneScreen, setPhoneScreen] = useState('dashboard');
  const [textSize, setTextSize] = useState(() => loadFromStorage('eco_textSize', 100));
  const [highContrast, setHighContrast] = useState(() => loadFromStorage('eco_highContrast', false));
  const [screenReader, setScreenReader] = useState(() => loadFromStorage('eco_screenReader', false));
  const [readerSpeech, setReaderSpeech] = useState("Asistente vocal activo. Navegue por las opciones disponibles.");
  const [tvFocusIndex, setTvFocusIndex] = useState(1);
  const tvFocusKeys = ['co2', 'energy', 'water', 'camera', 'chart'];
  const [watchEcoMode, setWatchEcoMode] = useState(() => loadFromStorage('eco_watchEcoMode', false));
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [formName, setFormName] = useState("");
  const [formWatts, setFormWatts] = useState("");
  const [formStatus, setFormStatus] = useState(true);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("Padre / Administrador");

  // Tema y edición de perfil
  const [isDarkMode, setIsDarkMode] = useState(() => loadFromStorage('eco_darkMode', true));
  const toggleTheme = useCallback(() => setIsDarkMode(prev => !prev), []);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileName, setEditProfileName] = useState(currentUser.name);
  const [editProfileEmail, setEditProfileEmail] = useState(currentUser.email);
  const [editProfileRole, setEditProfileRole] = useState(currentUser.role);

  const startEditProfile = () => {
    setEditProfileName(currentUser.name);
    setEditProfileEmail(currentUser.email);
    setEditProfileRole(currentUser.role);
    setIsEditingProfile(true);
  };
  const cancelEditProfile = () => setIsEditingProfile(false);
  const saveProfile = () => {
    if (!editProfileName || !editProfileEmail) {
      triggerToast("Nombre y correo son obligatorios", 'error');
      return;
    }
    const updatedUser = {
      ...currentUser,
      name: editProfileName,
      email: editProfileEmail,
      role: editProfileRole,
    };
    setCurrentUser(updatedUser);
    setIsEditingProfile(false);
    triggerToast("Perfil actualizado correctamente.");
  };

  // Persistencia
  useEffect(() => { saveToStorage('eco_isLoggedIn', isLoggedIn); }, [isLoggedIn]);
  useEffect(() => { saveToStorage('eco_currentUser', currentUser); }, [currentUser]);
  useEffect(() => { saveToStorage('eco_devices', devices); }, [devices]);
  useEffect(() => { saveToStorage('eco_textSize', textSize); }, [textSize]);
  useEffect(() => { saveToStorage('eco_highContrast', highContrast); }, [highContrast]);
  useEffect(() => { saveToStorage('eco_screenReader', screenReader); }, [screenReader]);
  useEffect(() => { saveToStorage('eco_watchEcoMode', watchEcoMode); }, [watchEcoMode]);
  useEffect(() => { saveToStorage('eco_darkMode', isDarkMode); }, [isDarkMode]);

  const triggerToast = useCallback((msg, soundType = 'notification') => {
    setToastMessage(msg);
    setShowToast(true);
    if (screenReader) setReaderSpeech(`Notificación: ${msg}`);
    playSound(soundType);
  }, [screenReader, playSound]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const totalWatts = (() => {
    const base = devices.reduce((sum, d) => sum + (d.status ? d.watts : 0), 0);
    return watchEcoMode ? Math.round(base * 0.7) : base;
  })();

  const speak = useCallback((desc) => {
    if (screenReader) setReaderSpeech(`Lector de pantalla: Seleccionado ${desc}`);
  }, [screenReader]);

  const openAddModal = () => {
    setEditMode(false);
    setFormName("");
    setFormWatts("");
    setFormStatus(true);
    setModalOpen(true);
    speak("Formulario para agregar nuevo dispositivo");
  };
  const openEditModal = (device) => {
    setEditMode(true);
    setSelectedDeviceId(device.id);
    setFormName(device.name);
    setFormWatts(device.watts.toString());
    setFormStatus(device.status);
    setModalOpen(true);
    speak(`Formulario para editar dispositivo ${device.name}`);
  };
  const saveDevice = () => {
    if (!formName || !formWatts) {
      triggerToast("Completa todos los campos obligatorios", 'error');
      return;
    }
    const wattsNum = parseInt(formWatts, 10);
    if (isNaN(wattsNum)) {
      triggerToast("El consumo debe ser un valor numérico", 'error');
      return;
    }
    if (editMode) {
      setDevices(d => d.map(dev => dev.id === selectedDeviceId
        ? { ...dev, name: formName, watts: wattsNum, status: formStatus }
        : dev));
      triggerToast(`"${formName}" actualizado correctamente.`);
    } else {
      const newDevice = { id: Date.now(), name: formName, watts: wattsNum, status: formStatus };
      setDevices(d => [...d, newDevice]);
      triggerToast(`"${formName}" añadido al catálogo.`, 'notification');
    }
    setModalOpen(false);
  };
  const deleteDevice = (id, name) => {
    setDevices(d => d.filter(dev => dev.id !== id));
    triggerToast(`"${name}" eliminado del catálogo.`, 'error');
    playSound('error');
  };
  const toggleDevice = (id, currentStatus, name) => {
    setDevices(d => d.map(dev => dev.id === id ? { ...dev, status: !dev.status } : dev));
    triggerToast(`"${name}" ${!currentStatus ? 'encendido' : 'apagado'}.`, 'toggle');
    playSound('toggle');
  };
  const apagarTodo = () => {
    setDevices(d => d.map(dev => ({ ...dev, status: false })));
    triggerToast("Todos los dispositivos apagados.", 'toggle');
    playSound('toggle');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      triggerToast("Por favor, llena todos los campos de registro.", 'error');
      return;
    }
    setCurrentUser({ name: regName, email: regEmail, role: regRole });
    setIsLoggedIn(true);
    setPhoneScreen('dashboard');
    triggerToast(`Registro de ${regName} procesado exitosamente.`);
  };
  const handleLogin = (method = 'password') => {
    setIsLoggedIn(true);
    setPhoneScreen('dashboard');
    const messages = {
      password: "Sesión iniciada correctamente.",
      fingerprint: "Huella reconocida. Acceso concedido.",
      qr: "Sincronizado vía código QR con Smart TV."
    };
    triggerToast(messages[method] || messages.password);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPhoneScreen('login');
    triggerToast("Sesión cerrada.");
  };

  const value = {
    currentDevice, setCurrentDevice,
    isLoggedIn, setIsLoggedIn,
    currentUser,
    devices, setDevices,
    phoneScreen, setPhoneScreen,
    textSize, setTextSize,
    highContrast, setHighContrast,
    screenReader, setScreenReader,
    readerSpeech,
    tvFocusIndex, setTvFocusIndex,
    tvFocusKeys,
    watchEcoMode, setWatchEcoMode,
    totalWatts,
    toastMessage, showToast,
    modalOpen, setModalOpen,
    editMode,
    formName, setFormName,
    formWatts, setFormWatts,
    formStatus, setFormStatus,
    regName, setRegName,
    regEmail, setRegEmail,
    regPassword, setRegPassword,
    regRole, setRegRole,
    triggerToast,
    speak,
    openAddModal, openEditModal,
    saveDevice, deleteDevice, toggleDevice, apagarTodo,
    handleRegister, handleLogin, handleLogout,
    playSound,
    isDarkMode, toggleTheme,
    isEditingProfile,
    editProfileName, setEditProfileName,
    editProfileEmail, setEditProfileEmail,
    editProfileRole, setEditProfileRole,
    startEditProfile, cancelEditProfile, saveProfile,
  };

  return (
    <EcoPulseContext.Provider value={value}>
      {children}
    </EcoPulseContext.Provider>
  );
}

export const useEcoPulse = () => {
  const ctx = useContext(EcoPulseContext);
  if (!ctx) throw new Error("useEcoPulse debe usarse dentro de EcoPulseProvider");
  return ctx;
};