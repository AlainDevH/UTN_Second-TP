import React, { useContext, useState } from 'react'
import { Link } from 'react-router'
import { ContactContext } from '../../Context/ContactContext'
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
    const { contacts, contact_selected } = useContext(ContactContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilter, setActiveFilter] = useState('Todos')

    // Filtrado de contactos por búsqueda
    const filteredContacts = contacts.filter((contact) => {
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (contact.lastMessage && contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()))

        if (activeFilter === 'No leídos') {
            return matchesSearch && contact.id % 2 === 0 // simulación de no leídos
        }
        return matchesSearch
    })

    return (
        <aside className="whatsapp-sidebar">
            {/* Header del Sidebar */}
            <header className="sidebar-header">
                <div className="header-left">
                    <h2 className="brand-title">WhatsApp</h2>
                </div>
                <div className="header-actions">
                    {/* Icono Canales / Estado */}
                    <button className="icon-btn" title="Estado" aria-label="Estado">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 2a10 10 0 0 1 10 10" strokeDasharray="4 4"></path>
                        </svg>
                    </button>
                    {/* Icono Nuevo Chat */}
                    <button className="icon-btn" title="Nuevo chat" aria-label="Nuevo chat">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            <line x1="12" y1="8" x2="12" y2="14"></line>
                            <line x1="9" y1="11" x2="15" y2="11"></line>
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
                        {filter}
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

                        return (
                            <Link
                                to={`/contact/${contact.id}`}
                                key={contact.id}
                                className={`contact-item ${isSelected ? 'active' : ''}`}
                            >
                                <div className="contact-avatar" style={{ backgroundColor: avatarBg }}>
                                    {initial}
                                </div>
                                <div className="contact-info">
                                    <div className="contact-header">
                                        <span className="contact-name">{contact.name}</span>
                                        <span className="contact-time">{lastMessageTime}</span>
                                    </div>
                                    <div className="contact-bottom">
                                        <p className="contact-last-message">{contact.lastMessage || 'Sin mensajes'}</p>
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
    )
}

export default WhatsappSidebar