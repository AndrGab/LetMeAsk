import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import { database } from '../services/firebase';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import Swal from 'sweetalert2'


import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');


  async function handleJoinRoom() {

    history.push(`/roomslist`);
  }

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'O Nome da Sala não pode estar em branco'
            })
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          {user && (<p> Olá <strong>{user.name}</strong> </p>)}
          <div className="separator">Crie uma sala</div>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <div className="separator">ou entre em uma sala</div>

          <Button onClick={handleJoinRoom}>
            Lista de Salas          </Button>
        </div>
      </main>
    </div>
  )
}