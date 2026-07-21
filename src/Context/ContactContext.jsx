import { createContext, useState } from "react";
import { Outlet, useParams } from "react-router";

const ContactContext = createContext()

const server_contacts = [
    {
        id: 1,
        name: "Juan Pérez",
        lastMessage: "Nos vemos mañana!",
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "hola!",
                time: "10:14"
            },
            {
                id: 2,
                sendByMe: true,
                content: "Todo bien!",
                time: "10:15"
            },
            {
                id: 3,
                sendByMe: false,
                content: "Que tal?",
                time: "10:20"
            },
            {
                id: 4,
                sendByMe: true,
                content: "Nos vemos mañana!",
                time: "10:22"
            }
        ]
    },
    {
        id: 2,
        name: "María Gómez",
        lastMessage: "Dale, gracias 🙏",
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "hola!",
                time: "09:00"
            },
            {
                id: 2,
                sendByMe: true,
                content: "Te pasé la información",
                time: "09:05"
            },
            {
                id: 3,
                sendByMe: false,
                content: "Dale, gracias 🙏",
                time: "09:10"
            }
        ]
    },
    {
        id: 3,
        name: "Carlos Ruiz",
        lastMessage: "Te mando el archivo",
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "hola!",
                time: "08:15"
            },
            {
                id: 2,
                sendByMe: false,
                content: "Te mando el archivo",
                time: "08:18"
            }
        ]
    },
    {
        id: 4,
        name: "Lucía Fernández",
        lastMessage: "Jajaja sí",
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "Viste la foto?",
                time: "Ayer"
            },
            {
                id: 2,
                sendByMe: true,
                content: "Jajaja sí",
                time: "Ayer"
            }
        ]
    },
]

function ContactContextProvider() {
    const [contacts, setContacts] = useState(server_contacts)

    const { contact_id } = useParams()

    let contact_selected = null

    if (contact_id) {
        contact_selected = contacts.find(contact => contact.id === Number(contact_id))
    }

    function deleteMessageById(message_id) {
        const contacts_modified = contacts.map(
            (contact) => {
                if (contact.id === Number(contact_id)) {
                    const filteredMessages = contact.messages.filter(message => message.id !== Number(message_id))
                    const lastMsg = filteredMessages.length > 0 ? filteredMessages[filteredMessages.length - 1].content : ""
                    return {
                        ...contact,
                        messages: filteredMessages,
                        lastMessage: lastMsg
                    }
                }
                return contact
            }
        )
        setContacts(contacts_modified)
    }

    function createMessage(value, sendByMe) {
        const now = new Date()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const currentTime = `${hours}:${minutes}`

        const contacts_modified = contacts.map(
            (contact) => {
                if (contact.id === Number(contact_id)) {
                    const new_message = {
                        content: value,
                        sendByMe: sendByMe,
                        id: Date.now(),
                        time: currentTime
                    }
                    const updatedMessages = [...contact.messages, new_message]
                    return {
                        ...contact,
                        lastMessage: value,
                        messages: updatedMessages
                    }
                }
                return contact
            }
        )
        setContacts(contacts_modified)
    }

    function deleteAllMessages() {
        const contacts_modified = contacts.map(
            (contact) => {
                if (contact.id === Number(contact_id)) {
                    return {
                        ...contact,
                        messages: [],
                        lastMessage: ""
                    }
                }
                return contact
            }
        )
        setContacts(contacts_modified)
    }

    const provider_values = {
        contacts: contacts,
        contact_selected,
        deleteMessageById,
        createMessage,
        deleteAllMessages
    }

    return (
        <ContactContext.Provider value={provider_values}>
            <Outlet />
        </ContactContext.Provider>
    )
}

export { ContactContext, ContactContextProvider }