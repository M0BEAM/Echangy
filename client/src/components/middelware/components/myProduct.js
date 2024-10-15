import { useContext } from "react";
import { ClientCtx } from "../../contexts/ClientContext";
import { Button,Container} from "reactstrap";
import { useEffect } from "react";
import { useState } from "react";
import LongSpiner from "../../bootstrap/LongSpinner";
import UseDelete from "../../hooks/useDelete";
import axios from "axios";
import UseProduct from "../../hooks/useProduct";
import UpdateModal from "../../tailwind/modal";
import { LanguageCtx } from "../../contexts/language";
const MyProduct = () => {
  const { fetchProduct, product, loading, setLoading } = UseProduct()
  const { client } = useContext(ClientCtx)
  const { loadingDel, setLoadingDel } = UseDelete()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({})
  const { language } = useContext(LanguageCtx)
  const [APPURL] = useState(process.env.REACT_APP_APIURL)
  const translations = require(`../../lang/${language}.json`).myDevices;
  useEffect(() => {

    const fetchData = async () => {
      await fetchProduct()
      setLoading(false)
    }
    fetchData()

  }, [])

  const deleteDevice = async (img, id) => {
    setLoadingDel(true)
    let publicId = img.slice(img.lastIndexOf("/") + 1, img.lastIndexOf('.'))
    await axios.delete(APPURL+"delete-image/" + publicId,{
      headers:{
          "X-API-Key":process.env.REACT_APP_APIKEY
      }
  })
    await axios.delete(APPURL+"delete/" + id,{
      headers:{
          "X-API-Key":process.env.REACT_APP_APIKEY
      }
  })
    await fetchProduct()
    setLoadingDel(false)
  }

  const updateDevice = async (id, name, image, description, phoneNumber) => {
    setOpen(true)
    setData({ id, name, image, description, phoneNumber })
    
  }

  if (loadingDel) {
    return (<LongSpiner />)
  }
  if (loading) {
    return (<LongSpiner />)
  }
  return (
    <>
      <Container className="position-relative text-center " style={{height:"81vh"}}>
        <h1 className="mt-2">{translations.title}</h1>
        {product && product.filter(item => item.client._id === client._id).map((item, index) => (

          <div className="card-deck" key={index} style={{ display: "inline-block", margin: "10px 15px" }} >
            <div className="card shadow-md">
              <img className="card-img-top" style={{ width: 250, height: 250 }} src={item.image} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <Button className="mx-1" color="danger " onClick={() => deleteDevice(item.image, item._id)}>{translations.button[0]}</Button>
                <Button color="success " onClick={() => updateDevice(item._id, item.name, item.image, item.description, item.phoneNumber)}>{translations.button[1]}</Button>
              </div>

            </div>
            
          </div>

        ))}

        {product.filter(item => item.client._id === client._id).length == 0 && (<h4>Devices not Found  ! <br /><a href="/home/addDevice">Add Your first device  </a></h4>)}
      </Container>
      <UpdateModal modals={{open, setOpen}} data={data} setData={setData} />
    </>
  )
}

export default MyProduct;