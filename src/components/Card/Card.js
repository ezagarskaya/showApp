import React from 'react'
import Modal from 'react-modal';
import 'antd/dist/antd.css';
import { Card } from 'antd';

const { Meta } = Card;
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const ModalCard = ({row}) => {
  console.log(row, 'rowrowrowrowrowrowrow')
  return (
    <Modal
      isOpen={row.modalIsOpen}
      ariaHideApp={false}
      style={customStyles}
      contentLabel="Modal"
    >
      <Card
        hoverable
        style={{ width: 500 }}
        cover={<img alt="Logo" src={row.imgUrl} />}
      >
        <Meta
          title={<a href={row.details.homepage}>{row.title}</a>}
          description={row.details.overview}
        />
        <br/>
        <Meta
          title={"Trailer"}
          description={<a href={row.details.trailer}>{row.details.trailer}</a>}
        />
      </Card>
    </Modal>
  )
}

export default ModalCard