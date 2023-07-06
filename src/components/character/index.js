import React, { useState } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import './style.css';
const Character = ({ instance }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const description = !instance.description.length
    ? 'Description not available.'
    : instance.description.length > 150
    ? instance.description
        .substring(0, 150)
        .split('')
        .concat('...')
        .join('')
    : instance.description;
  const fullDescription = !instance.description.length ? 'Description not available.' : instance.description;
  const comics = instance.comics.items;
  const series = instance.series.items;
  const stories = instance.stories.items;
  const detail = instance.urls.find((r) => r.type === 'detail');
  const wiki = instance.urls.find((r) => r.type === 'wiki');
  const comicLink = instance.urls.find((r) => r.type === 'comiclink');
  const image = `${instance.thumbnail.path}.${instance.thumbnail.extension}`;
  return (
    <div className='Character'>
      <div className='text-center Character-name'>
        <span className='h3'>{instance.name}</span>
      </div>
      <div className='Character-image' style={{ backgroundImage: `url('${image}')` }} />
      <p className='Character-description'>{description}</p>
      <button type='button' className='btn btn-primary btn-lg Character-link' onClick={handleShow}>
        Read more
      </button>
      <Modal show={show} animation={false} onHide={handleClose} dialogClassName='Character-modal'>
        <Modal.Header closeButton>
          <Modal.Title>{instance.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={image} alt={instance.name} className='Character-modal-img img-circle ' />
          <div className='Character-modal-desc'>
            <h4>Description</h4>
            <p>{fullDescription}</p>
            {detail && (
              <a target='_blank' className='btn-link btn-block' href={detail.url} rel='noopener noreferrer'>
                Read more on Marvel Official Page
              </a>
            )}
            {wiki && (
              <a target='_blank' className='btn-link btn-block' href={wiki.url} rel='noopener noreferrer'>
                Read more on Marvel Universe Wiki
              </a>
            )}
            {comicLink && (
              <a target='_blank' className='btn-link btn-block' href={comicLink.url} rel='noopener noreferrer'>
                Read Comic Public Info
              </a>
            )}
          </div>
          <Tabs defaultActiveKey={1} id='characterTabs' className='hidden-xs Character-modal-tabs'>
            <Tab eventKey={1} title={`Comics (${comics.length})`}>
              {comics.length ? (
                <ul className='list-inline'>
                  {comics.map((c, i) => (
                    <li key={i}>
                      <span className='label label-default'>{c.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No Comics Available.</p>
              )}
            </Tab>
            <Tab eventKey={2} title={`Series (${series.length})`}>
              {series.length ? (
                <ul className='list-inline'>
                  {series.map((c, i) => (
                    <li key={i}>
                      <span className='label label-default'>{c.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No Series Available.</p>
              )}
            </Tab>
            <Tab eventKey={3} title={`Stories (${stories.length})`}>
              {stories.length ? (
                <ul className='list-inline'>
                  {stories.map((c, i) => (
                    <li key={i}>
                      <span className='label label-default'>{c.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No Comics Available.</p>
              )}
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Character;
