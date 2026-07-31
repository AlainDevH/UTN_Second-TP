import React, { useContext, useState } from 'react'
import { Link } from 'react-router'
import { ContactContext } from '../../Context/ContactContext'
import { ThemeContext } from '../../Context/ThemeContext'
import AddContactModal from '../AddContactModal/AddContactModal'
import UserProfileDrawer from '../UserProfileDrawer/UserProfileDrawer'
import WhatsappNavRail from '../WhatsappNavRail/WhatsappNavRail'
import './WhatsappSidebar.css'

// Genera un color consistente basado en el nombre para los avatares
const getAvatarColor = (name) => {
    const colors = ['#00a884', '#128c7e', '#075e54', '#34b7f1', '#6f42c1', '#e83e8c', '#fd7e14', '#20c997']
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}

const WhatsappSidebar = () => {
    const { contacts, contact_selected, userProfile, showUserProfile, setShowUserProfile } = useContext(ContactContext)
    const { theme, setTheme } = useContext(ThemeContext)

    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilter, setActiveFilter] = useState('Todos')
    const [showAddModal, setShowAddModal] = useState(false)

    // Cambiar entre Tema Oscuro y Tema Claro
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    // Filtrado de contactos por búsqueda
    const filteredContacts = contacts.filter((contact) => {
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (contact.lastMessage && contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()))

        if (activeFilter === 'No leídos') {
            return matchesSearch && contact.unreadCount && contact.unreadCount > 0
        }
        if (activeFilter === 'Grupos') {
            return false
        }
        return matchesSearch
    })

    const userInitial = userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'A'
    const userAvatarBg = getAvatarColor(userProfile?.name || 'AlainDev')

    const totalUnreadCount = contacts.reduce((acc, contact) => acc + (contact.unreadCount || 0), 0)

    return (
        <div className="sidebar-container-wrapper">
            {/* Barra Vertical de Navegación con foto de AlainDev abajo a la izquierda */}
            <WhatsappNavRail onOpenProfile={() => setShowUserProfile(true)} />

            <aside className="whatsapp-sidebar">
                {/* Header del Sidebar */}
                <header className="sidebar-header">
                    <div 
                        className="header-left clickable-profile" 
                        onClick={() => setShowUserProfile(true)}
                        title={`Ver perfil de ${userProfile?.name || 'AlainDev'}`}
                        id="open-user-profile-btn"
                    >
                        <h2 className="brand-title">Chats</h2>
                    </div>
                    <div className="header-actions">
                        {/* Botón de Cambio de Tema Oscuro / Claro */}
                        <button
                            className="icon-btn theme-toggle-btn"
                            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                            aria-label="Cambiar tema"
                            onClick={toggleTheme}
                            id="toggle-theme-btn"
                        >
                            {theme === 'dark' ? (
                                /* Icono de Sol para activar Modo Claro */
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                            ) : (
                                /* Icono de Luna para activar Modo Oscuro */
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            )}
                        </button>

                        {/* Icono Agregar / Nuevo Contacto */}
                        <button
                            className="icon-btn add-contact-btn"
                            title="Añadir nuevo contacto"
                            aria-label="Nuevo contacto"
                            onClick={() => setShowAddModal(true)}
                            id="open-add-contact-btn"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="17" y1="11" x2="23" y2="11"></line>
                            </svg>
                        </button>

                        {/* Icono Menú */}
                        <button className="icon-btn" title="Menú" aria-label="Menú">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Barra de Búsqueda */}
                <div className="search-container">
                    <div className="search-box">
                        <span className="search-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Buscar o empezar un nuevo chat"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Chips de filtro rápido */}
                <div className="filter-container">
                    {['Todos', 'No leídos', 'Grupos'].map((filter) => (
                        <button
                            key={filter}
                            className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            <span>{filter}</span>
                            {filter === 'No leídos' && totalUnreadCount > 0 && (
                                <span className="chip-badge">{totalUnreadCount}</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Lista de Contactos */}
                <div className="contact-list">
                    {filteredContacts.length > 0 ? (
                        filteredContacts.map((contact) => {
                            const isSelected = contact_selected && contact_selected.id === contact.id
                            const initial = contact.name ? contact.name.charAt(0).toUpperCase() : '?'
                            const avatarBg = getAvatarColor(contact.name || '')
                            const lastMsgObj = contact.messages && contact.messages.length > 0 ? contact.messages[contact.messages.length - 1] : null
                            const lastMessageTime = lastMsgObj ? lastMsgObj.time : ''
                            const hasUnread = Boolean(contact.unreadCount && contact.unreadCount > 0)

                            return (
                                <Link
                                    to={`/contact/${contact.id}`}
                                    key={contact.id}
                                    className={`contact-item ${isSelected ? 'active' : ''}`}
                                >
                                    <div className="contact-avatar" style={{ backgroundColor: avatarBg }}>
                                        {contact.avatarUrl ? (
                                            <img src={contact.avatarUrl} alt={contact.name} className="avatar-img" />
                                        ) : (
                                            initial
                                        )}
                                    </div>
                                    <div className="contact-info">
                                        <div className="contact-header">
                                            <span className="contact-name">{contact.name}</span>
                                            <span className={`contact-time ${hasUnread ? 'unread' : ''}`}>{lastMessageTime}</span>
                                        </div>
                                        <div className="contact-bottom">
                                            <p className={`contact-last-message ${hasUnread ? 'unread-text' : ''}`}>
                                                {contact.lastMessage || 'Sin mensajes'}
                                            </p>
                                            {hasUnread ? (
                                                <span className="unread-badge">{contact.unreadCount}</span>
                                            ) : null}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    ) : (
                        <div className="empty-contacts">
                            No se encontraron contactos
                        </div>
                    )}
                </div>
            </aside>

            {/* Modal para añadir contacto */}
            {showAddModal && (
                <AddContactModal onClose={() => setShowAddModal(false)} />
            )}
        </div>
    )
}

export default WhatsappSidebar