import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import WhatsappSidebar from '../../Components/WhatsappSidebar/WhatsappSidebar'
import Messages from '../../Components/Messages/Messages'
import ContactProfileDrawer from '../../Components/ContactProfileDrawer/ContactProfileDrawer'
import UserProfileDrawer from '../../Components/UserProfileDrawer/UserProfileDrawer'
import { ContactContext } from '../../Context/ContactContext'
import './ContactChatScreen.css'

// Genera un color consistente basado en el nombre para los avatares (mismo algoritmo que el Sidebar)
const getAvatarColor = (name) => {
    const colors = ['#00a884', '#128c7e', '#075e54', '#34b7f1', '#6f42c1', '#e83e8c', '#fd7e14', '#20c997']
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}

const ContactChatScreen = () => {
    const { contact_selected, deleteAllMessages, showUserProfile, setShowUserProfile } = useContext(ContactContext)
    
    // Estado local para controlar si la vista del perfil del contacto está abierta o cerrada
    const [showProfile, setShowProfile] = useState(false)

    // Actualizar el título de la página dinámicamente para cumplir con las mejores prácticas SEO
    useEffect(() => {
        if (contact_selected) {
            document.title = `Chat con ${contact_selected.name} - WhatsApp`
        } else {
            document.title = "WhatsApp"
        }
    }, [contact_selected])

    if (!contact_selected) {
        return (
            <div className="chat-layout" id="chat-not-found-layout">
                <WhatsappSidebar />
                <div className="chat-area empty" id="chat-empty-panel">
                    <h2 style={{ fontSize: '22px', fontWeight: '400', margin: '0' }}>Contacto no encontrado</h2>
                    <p style={{ fontSize: '14px', margin: '0' }}>Por favor selecciona un contacto válido a la izquierda.</p>
                </div>
            </div>
        )
    }

    const initial = contact_selected.name ? contact_selected.name.charAt(0).toUpperCase() : '?'
    const avatarBg = getAvatarColor(contact_selected.name || '')

    return (
        <div className="chat-layout" id={`chat-layout-${contact_selected.id}`}>
            {/* Sidebar con lista de chats a la izquierda */}
            <WhatsappSidebar />

            {/* Área principal del chat */}
            <div className="chat-area" id="chat-main-area">
                {/* Cabecera del Chat */}
                <header className="chat-header" id="chat-header-container">
                    {/* Botón de Retorno para Dispositivos Móviles (< 768px) */}
                    <Link to="/home" className="mobile-back-btn" title="Volver a los chats" aria-label="Volver">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </Link>

                    <div 
                        className="chat-header-info clickable-header" 
                        id="chat-header-user-info"
                        onClick={() => setShowProfile(!showProfile)}
                        title="Ver info. del contacto"
                    >
                        <div className="chat-header-avatar" style={{ backgroundColor: avatarBg }} id="chat-header-avatar">
                            {contact_selected.avatarUrl ? (
                                <img src={contact_selected.avatarUrl} alt={contact_selected.name} className="avatar-img" />
                            ) : (
                                initial
                            )}
                        </div>
                        <div className="chat-header-details" id="chat-header-user-details">
                            <span className="chat-header-name" id="chat-header-name">{contact_selected.name}</span>
                            <span className="chat-header-status" id="chat-header-status">{contact_selected.status || 'en línea'}</span>
                        </div>
                    </div>
                    
                    <div className="chat-header-actions" id="chat-header-actions-container">
                        {/* Icono para abrir el perfil de contacto */}
                        <button 
                            className={`icon-btn ${showProfile ? 'active' : ''}`}
                            title="Información del contacto" 
                            aria-label="Ver perfil"
                            onClick={() => setShowProfile(!showProfile)}
                            id="toggle-profile-btn"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </button>
                        {/* Icono de búsqueda de mensajes */}
                        <button className="icon-btn" title="Buscar mensaje" aria-label="Buscar mensaje">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                        {/* Icono de eliminar todo el historial */}
                        <button 
                            className="icon-btn danger-btn" 
                            title="Eliminar historial de chat" 
                            aria-label="Eliminar historial"
                            onClick={deleteAllMessages}
                            id="delete-chat-history-btn"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </header>

                {/* El componente Messages renderizará los mensajes y el pie de entrada */}
                <Messages />
            </div>

            {/* Renderizado Condicional del Drawer de Perfil del Contacto */}
            {showProfile && !showUserProfile && (
                <ContactProfileDrawer 
                    contact={contact_selected} 
                    onClose={() => setShowProfile(false)} 
                />
            )}

            {/* Renderizado Condicional del Drawer de Perfil de Usuario AlainDev */}
            {showUserProfile && (
                <UserProfileDrawer 
                    onClose={() => setShowUserProfile(false)} 
                />
            )}
        </div>
    )
}

export default ContactChatScreen