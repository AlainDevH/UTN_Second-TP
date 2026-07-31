import React, { useContext } from 'react'
import { ContactContext } from '../../Context/ContactContext'
import { ThemeContext } from '../../Context/ThemeContext'
import './WhatsappNavRail.css'

const WhatsappNavRail = ({ onOpenProfile, activeTab = 'chats', setActiveTab }) => {
    const { userProfile, showUserProfile, setShowUserProfile } = useContext(ContactContext)
    const { theme, setTheme } = useContext(ThemeContext)

    const handleProfileClick = () => {
        if (onOpenProfile) {
            onOpenProfile()
        } else {
            setShowUserProfile(!showUserProfile)
        }
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <nav className="whatsapp-nav-rail" id="whatsapp-nav-rail" aria-label="Navegación principal">
            {/* Sección Superior: Navegación de Apps */}
            <div className="nav-top-section">
                {/* 1. Chats (Activo por defecto) */}
                <button
                    className={`nav-item-btn ${activeTab === 'chats' ? 'active' : ''}`}
                    title="Chats"
                    aria-label="Chats"
                    onClick={() => setActiveTab && setActiveTab('chats')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.025L2 22l5.092-1.31A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                </button>

                {/* 2. Llamadas */}
                <button
                    className={`nav-item-btn ${activeTab === 'calls' ? 'active' : ''}`}
                    title="Llamadas"
                    aria-label="Llamadas"
                    onClick={() => setActiveTab && setActiveTab('calls')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                </button>

                {/* 3. Estados / Historias */}
                <button
                    className={`nav-item-btn ${activeTab === 'status' ? 'active' : ''}`}
                    title="Estados"
                    aria-label="Estados"
                    onClick={() => setActiveTab && setActiveTab('status')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" strokeDasharray="4 2"></circle>
                        <circle cx="12" cy="12" r="5"></circle>
                    </svg>
                </button>

                {/* 4. Novedades / Canales */}
                <button
                    className={`nav-item-btn ${activeTab === 'channels' ? 'active' : ''}`}
                    title="Novedades"
                    aria-label="Novedades"
                    onClick={() => setActiveTab && setActiveTab('channels')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="10" r="2" fill="currentColor"></circle>
                    </svg>
                </button>

                {/* 5. Comunidades */}
                <button
                    className={`nav-item-btn ${activeTab === 'communities' ? 'active' : ''}`}
                    title="Comunidades"
                    aria-label="Comunidades"
                    onClick={() => setActiveTab && setActiveTab('communities')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </button>

                {/* Separador */}
                <div className="nav-divider"></div>

                {/* 6. Archivados */}
                <button
                    className={`nav-item-btn ${activeTab === 'archived' ? 'active' : ''}`}
                    title="Archivados"
                    aria-label="Archivados"
                    onClick={() => setActiveTab && setActiveTab('archived')}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="21 8 21 21 3 21 3 8"></polyline>
                        <rect x="1" y="3" width="22" height="5"></rect>
                        <line x1="10" y1="12" x2="14" y2="12"></line>
                    </svg>
                </button>

                {/* 7. Meta AI */}
                <button
                    className="nav-item-btn ai-btn"
                    title="Meta AI"
                    aria-label="Meta AI"
                >
                    <div className="meta-ai-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="url(#aiGradient)" strokeWidth="3" strokeDasharray="5 2" />
                            <defs>
                                <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00a884" />
                                    <stop offset="50%" stopColor="#a855f7" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </button>
            </div>

            {/* Sección Inferior: Ajustes y Perfil de AlainDev */}
            <div className="nav-bottom-section">
                {/* Botón de Galería / Ajustes */}
                <button
                    className="nav-item-btn"
                    title="Galería y Multimedia"
                    aria-label="Galería"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                </button>

                {/* Botón de Cambio de Tema */}
                <button
                    className="nav-item-btn"
                    title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                    aria-label="Cambiar tema"
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    )}
                </button>

                {/* FOTO DE PERFIL DE ALAINDEV EN LA PARTE INFERIOR IZQUIERDA */}
                <button
                    className={`nav-profile-btn ${showUserProfile ? 'active' : ''}`}
                    title={`Perfil de ${userProfile?.name || 'AlainDev'}`}
                    aria-label="Perfil de usuario"
                    onClick={handleProfileClick}
                    id="nav-user-profile-avatar"
                >
                    {userProfile?.avatarUrl ? (
                        <img src={userProfile.avatarUrl} alt={userProfile.name} className="nav-profile-img" />
                    ) : (
                        <div className="nav-profile-fallback">
                            {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                    )}
                </button>
            </div>
        </nav>
    )
}

export default WhatsappNavRail
