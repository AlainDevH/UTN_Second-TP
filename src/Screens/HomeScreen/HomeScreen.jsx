import React, { useContext, useEffect } from "react"
import WhatsappSidebar from "../../Components/WhatsappSidebar/WhatsappSidebar"
import UserProfileDrawer from "../../Components/UserProfileDrawer/UserProfileDrawer"
import { ContactContext } from "../../Context/ContactContext"
import "./HomeScreen.css"

function HomeScreen() {
    const { contacts, showUserProfile, setShowUserProfile } = useContext(ContactContext)

    // Actualizar el título de la página dinámicamente para cumplir con las mejores prácticas SEO
    useEffect(() => {
        document.title = "WhatsApp Web"
    }, [])

    return (
        <div className="home-layout" id="whatsapp-home-layout">
            {/* Sidebar con lista de contactos */}
            <WhatsappSidebar />

            {/* Panel de Bienvenida principal */}
            <main className="welcome-main" id="welcome-panel" aria-label="Pantalla de bienvenida de WhatsApp">
                <div className="welcome-content" id="welcome-content-container">
                    
                    {/* Ilustración de dispositivos conectados en SVG de alta calidad */}
                    <div className="welcome-illustration-container" id="welcome-illustration-wrapper">
                        <svg viewBox="0 0 540 280" width="100%" height="auto" fill="none" className="welcome-illustration" id="devices-svg" xmlns="http://www.w3.org/2000/svg">
                            {/* Círculos concéntricos de fondo */}
                            <circle cx="270" cy="140" r="120" fill="var(--border-color)" opacity="0.4" />
                            <circle cx="270" cy="140" r="90" fill="var(--border-color)" opacity="0.6" />
                            
                            {/* Ondas de conexión */}
                            <path d="M190,140 Q270,90 350,140" stroke="var(--text-green-light)" strokeWidth="3" strokeLinecap="round" strokeDasharray="6,6" opacity="0.8" />
                            <path d="M190,140 Q270,190 350,140" stroke="var(--text-green-light)" strokeWidth="3" strokeLinecap="round" strokeDasharray="6,6" opacity="0.8" />

                            {/* Computadora Portátil */}
                            <g transform="translate(110, 80)">
                                {/* Carcasa de la pantalla */}
                                <rect width="180" height="110" rx="8" fill="#aebac1" />
                                <rect x="6" y="6" width="168" height="92" rx="4" fill="#222e35" />
                                
                                {/* Contenido de la pantalla */}
                                <rect x="16" y="16" width="60" height="8" rx="2" fill="var(--text-green-light)" opacity="0.7" />
                                <rect x="16" y="30" width="100" height="6" rx="2" fill="#ffffff" opacity="0.2" />
                                <rect x="16" y="42" width="80" height="6" rx="2" fill="#ffffff" opacity="0.2" />
                                <rect x="16" y="54" width="120" height="6" rx="2" fill="#ffffff" opacity="0.2" />
                                <circle cx="140" cy="35" r="12" fill="var(--text-green-light)" opacity="0.8" />
                                
                                {/* Base de teclado */}
                                <path d="M-15,110 L195,110 L205,124 L-25,124 Z" fill="#cfd8dc" />
                                <rect x="-25" y="122" width="230" height="4" rx="2" fill="#b0bec5" />
                                
                                {/* Muesca de apertura */}
                                <rect x="75" y="110" width="30" height="4" rx="1" fill="#78909c" />
                            </g>

                            {/* Teléfono Inteligente */}
                            <g transform="translate(330, 95)">
                                {/* Cuerpo del teléfono */}
                                <rect width="70" height="125" rx="12" fill="#54656f" stroke="#cfd8dc" strokeWidth="2" />
                                <rect x="4" y="8" width="62" height="102" rx="6" fill="#111b21" />
                                
                                {/* Altavoz y cámara */}
                                <rect x="25" y="4" width="20" height="2" rx="1" fill="#cfd8dc" />
                                <circle cx="50" cy="5" r="1.5" fill="#cfd8dc" />
                                
                                {/* Mensajes en pantalla */}
                                <rect x="10" y="20" width="35" height="10" rx="4" fill="var(--text-green)" opacity="0.8" />
                                <rect x="25" y="35" width="35" height="10" rx="4" fill="#202d33" />
                                <rect x="10" y="50" width="40" height="10" rx="4" fill="var(--text-green)" opacity="0.8" />
                                
                                {/* Botón / Línea inferior */}
                                <rect x="23" y="116" width="24" height="3" rx="1.5" fill="#cfd8dc" />
                            </g>

                            {/* Logotipo de WhatsApp central */}
                            <g transform="translate(250, 120)">
                                <circle cx="20" cy="20" r="28" fill="var(--background-welcome)" />
                                <circle cx="20" cy="20" r="24" fill="var(--text-green-light)" />
                                <path d="M20,7 C12.8,7 7,12.8 7,20 C7,22.3 7.6,24.5 8.7,26.4 L7.1,32.3 L13.2,30.7 C15,31.7 17.1,32.2 19.3,32.2 C26.5,32.2 32.3,26.4 32.3,19.3 C32.3,12.2 26.5,7 20,7 Z M15.5,14 C15.8,14 16.1,14.1 16.4,14.6 C16.7,15.2 17.4,17 17.5,17.2 C17.6,17.4 17.6,17.6 17.5,17.8 C17.4,18 17.2,18.2 17,18.4 C16.8,18.6 16.6,18.8 16.4,19 C16.2,19.2 16,19.4 16.2,19.8 C16.4,20.2 17,21.2 17.9,22 C19,23 20,23.3 20.4,23.5 C20.8,23.7 21,23.6 21.2,23.4 C21.4,23.2 21.8,22.7 22,22.3 C22.2,21.9 22.4,22 22.7,22.1 C23,22.2 24.6,23 24.9,23.2 C25.2,23.4 25.4,23.5 25.5,23.6 C25.6,23.7 25.6,24.2 25.4,24.8 C25.2,25.4 24.1,26.1 23.6,26.2 C23.1,26.3 22.5,26.4 20.4,25.5 C17.9,24.5 15.6,21.6 14.9,20.7 C14.2,19.8 13.5,18.2 13.5,16.5 C13.5,14.8 14.4,14.1 14.7,13.8 C15,13.5 15.3,14 15.5,14 Z" fill="#ffffff" />
                            </g>
                        </svg>
                    </div>

                    {/* Textos Informativos */}
                    <h1 className="welcome-title" id="welcome-title">WhatsApp Web</h1>
                    <p className="welcome-text" id="welcome-description">
                        Envía y recibe mensajes sin necesidad de mantener tu teléfono conectado.
                    </p>
                    <p className="welcome-subtext" id="welcome-subdescription">
                        Usa WhatsApp en hasta 4 dispositivos vinculados a la vez.
                    </p>
                    
                    <div className="welcome-divider" id="welcome-separator"></div>
                </div>

                {/* Pie de página con cifrado */}
                <footer className="welcome-footer" id="welcome-footer" aria-label="Seguridad">
                    <svg width="10" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" id="lock-icon" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Cifrado de extremo a extremo</span>
                </footer>
            </main>

            {/* Panel de Perfil de AlainDev a la derecha */}
            {showUserProfile && (
                <UserProfileDrawer onClose={() => setShowUserProfile(false)} />
            )}
        </div>
    )
}

export default HomeScreen