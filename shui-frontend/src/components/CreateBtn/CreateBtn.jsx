import './CreateBtn.css';

import edit from '../../assets/edit.png';
function CreateBtn() {
  return (
    <a className='create-btn' href='/create'>
      <img
        className='create-btn__icon'
        src={edit}
        alt='Create message button'
      />
    </a>
  );
}

export default CreateBtn;
