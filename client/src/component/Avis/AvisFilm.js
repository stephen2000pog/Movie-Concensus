import React from 'react';

function AvisFilm(props) {
  return (
    <>
      <h2 className='fs-4 bg-secondary text-white'>Mon Avis du film</h2>
      <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Avis</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {props.listeAvis.map((avisItem, index) => (
              <tr key={index}>
                <td>{avisItem.avis}</td>
                <td>{avisItem.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
}

export default AvisFilm;