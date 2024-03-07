import {Card} from 'react-bootstrap';

import Slider from '../Slider/Slider';

function Home() {
  return (
    <>
      <Slider/>

      <Card className='text-center mt-3 mx-5' >
        <Card.Header className='fs-1 bg-secondary text-white'>Critiques</Card.Header>
        <Card.Body>
          <Card.Title>Pourquoi les critiques?</Card.Title>
          <Card.Text>
            Que vous soyez un cinéphile passionné à la recherche de recommandations ou simplement quelqu'un qui cherche à passer une bonne soirée devant un film, Nous sommes là pour vous aider. Parcourez nos critiques détaillées, consultez nos classements et découvrez les dernières sorties cinématographiques. Nous couvrons une large gamme de genres, des drames aux comédies en passant par les films d'action et les documentaires, afin de répondre aux goûts de chacun.        </Card.Text>
        </Card.Body>
        <Card.Footer className='bg-secondary text-white'>Nous efforçons de faire entendre la voix de la critique cinématographique authentique et impartiale.</Card.Footer>
      </Card>
    </>
  );
}

export default Home;