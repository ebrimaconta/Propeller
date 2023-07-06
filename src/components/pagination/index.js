import Pagination from 'react-js-pagination';
import './style.css';

function Pagniation({ page, maxPage, changePage }) {
  return (
    <div className='center'>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={maxPage}
        pageRangeDisplayed={5}
        onChange={changePage}
      />
    </div>
  );
}

export default Pagniation;
