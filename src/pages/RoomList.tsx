import { useHistory } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import { useRoomList } from '../hooks/useRoomList';
import logoImg from '../assets/images/logo.svg'
import '../styles/room.scss'


export function RoomList() {
    const history = useHistory();
    const { rooms } = useRoomList();
    const { user, signOutGoogle } = useAuth();

    function handleGoHome() {
        return history.push('/')
    }

    function handleGoRoom(RoomId: string, author: string, endedAt: boolean) {
        if (!endedAt) {

            if (user?.id === author) {
                return history.push(`admin/rooms/${RoomId}`)
            } else { return history.push(`rooms/${RoomId}`) }
        } else {
            return window.alert('Room is closed!')
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" onClick={handleGoHome} />
                    <div>
                        {user && (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} onClick={signOutGoogle} />
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className="content">
                <div className="question-list">
                    <h1>Lista de Salas</h1>
                    <div className='room-list'>
                        {rooms.length !== 0 ?
                            rooms.map((sala: any) => {
                                return (<div className={'room-list'}
                                    onClick={() => handleGoRoom(sala.roomId, sala.authorId, sala?.endedAt)}
                                    key={sala.roomId} >
                                    {!sala.endedAt && (
                                        <span className={`${sala.endedAt ? 'closed' : 'opened'}`}>{sala.title}</span>
                                    )}
                                </div>)
                            })
                            : (<h1>Nenhuma sala disponível</h1>)}
                    </div>
                </div>
            </main>
        </div>
    )
}