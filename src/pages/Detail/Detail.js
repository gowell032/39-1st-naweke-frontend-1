import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Detail.scss';
import DetailModal from './DetailModal';
import Right from './Right';
import Left from './Left';

function Detail() {
  const accessToken = localStorage.getItem('token');
  const [detailData, setDetailData] = useState([]);
  const [size, setSize] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const params = useParams();
  useEffect(() => {
    fetch(`http://10.58.52.162:3000/products/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => setDetailData(data));
  }, []);
  
  const switchModal = () => {
    setIsOpenModal(prev => !prev);
  };
  
  if (!detailData.productInfo) return null;

  return (
    <div className="detail">
      <Left detailData={detailData} />

      <Right
        setSize={setSize}
        switchModal={switchModal}
        // basketAccess={basketAccess}
        detailData={detailData}
      />

      {isOpenModal && <DetailModal switchModal={switchModal} />}
    </div>
  );
}
export default Detail;
