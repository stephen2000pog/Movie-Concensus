import { Card } from 'react-bootstrap';

function ErrorPage() {
  return (
   
    <div className="App-header">
          <Card className="text-center" >
        <Card.Header className='bg-secondary text-white'>Erreur 404</Card.Header>
        <Card.Body>
          <Card.Title>Page non trouvée</Card.Title>
          <Card.Text>
            </Card.Text>
        </Card.Body>
      </Card>

    </div>
    
  );
}

export default ErrorPage;