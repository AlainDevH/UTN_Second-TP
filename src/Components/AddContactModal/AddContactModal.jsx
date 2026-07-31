import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { ContactContext } from '../../Context/ContactContext'
import './AddContactModal.css'

/**
 * Componente AddContactModal
 * Muestra un formulario emergente con el diseño visual de WhatsApp Web para crear un nuevo contacto.
 * 
 * Props:
 * - onClose: función para cerrar el modal
 */
const AddContactModal = ({ onClose }) => {
    const { createContact } = useContext(ContactContext)
    const navigate = useNavigate()

    // Estados del formulario
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [info, setInfo] = useState('¡Hola! Estoy usando WhatsApp.')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name.trim()) {
            setError('Por favor ingresa el nombre del contacto')
            return
        }

        // Crear contacto en el Contexto
        const newContactId = createContact(name.trim(), phone.trim(), info.trim())

        // Cerrar el modal y navegar al chat del nuevo contacto
        onClose()
        navigate(`/contact/${newContactId}`)
    }

    return (
        <div className="modal-backdrop" onClick={onClose} id="add-contact-modal-backdrop">
            <div 
                className="add-contact-card" 
                onClick={(e) => e.stopPropagation()} 
                id="add-contact-card-container"
            >
                {/* Cabecera del Modal */}
                <header className="add-contact-header">
                    <h3 className="add-contact-title">Añadir nuevo contacto</h3>
                    <button 
                        className="icon-btn close-modal-btn" 
                        onClick={onClose}
                        title="Cerrar modal"
                        aria-label="Cerrar"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </header>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="add-contact-form">
                    {error && <div className="form-error-alert">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="contact-name">Nombre completo *</label>
                        <input
                            id="contact-name"
                            type="text"
                            className="form-input"
                            placeholder="Ej. Ana Martínez"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                if (error) setError('')
                            }}
                            autoFocus
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact-phone">Número de teléfono</label>
                        <input
                            id="contact-phone"
                            type="tel"
                            className="form-input"
                            placeholder="Ej. +54 9 11 5555-4444"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact-info">Info. / Estado del perfil</label>
                        <input
                            id="contact-info"
                            type="text"
                            className="form-input"
                            placeholder="Ej. En la facultad 📚"
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                        />
                    </div>

                    <div className="add-contact-actions">
                        <button 
                            type="button" 
                            className="btn-secondary" 
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn-primary"
                        >
                            Guardar contacto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddContactModal
