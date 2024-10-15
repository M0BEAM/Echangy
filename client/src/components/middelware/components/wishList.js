import { useContext } from "react";
import { ClientCtx } from "../../contexts/ClientContext";
import { Button, Container } from "reactstrap";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LongSpiner from "../../bootstrap/LongSpinner";
import { LanguageCtx } from "../../contexts/language";
const WishList = () => {
  //const {wishList,setWishList} = useContext(WishListCtx)
  const { client } = useContext(ClientCtx)
  const [wishList, setWishList] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { language } = useContext(LanguageCtx)
  const [APPURL] = useState(process.env.REACT_APP_APIURL)
  const translations = require(`../../lang/${language}.json`).wishlist;
  useEffect(() => {
    const getWishList = async () => {
     try {
      const data = await axios.get(APPURL + "getWishList", {
        headers: {
          "X-API-Key": process.env.REACT_APP_APIKEY,
        }
      })
      setLoading(false)
      if (data.data.success)
        setWishList(data.data.wishList)
     } catch (error) {
      console.log(error.message)
     }
    }
    getWishList()
  }, [])

  const handeleExChange = (id) => {
    navigate("/home/device/" + id)
  }

  if (loading)
    return (<LongSpiner />)

  return (
    <Container className="text-center " style={{ height: "81vh" }}>
      <h1 className="mt-2">{translations.title}</h1>
      {wishList ? (wishList.filter((e) => { if (e.client === client?._id && e.product != null) { return e } }).map((item, index) => (

        <div className="card-deck " key={index} style={{ display: "inline-block", margin: "10px 10px" }} >
          <div className="card shadow-md">
            <img className="card-img-top" style={{ width: 250, height: 250 }} src={item.product.image} alt="Card image cap" />
            <div className="card-body d-flex align-items-center flex-column">
              <h5 className="card-title">{item.product.name}</h5>
              <p className="card-text">{item.product.client.name}</p>
              <Button color="success" onClick={() => handeleExChange(item.product._id)}>
                {translations.button}
              </Button>
            </div>
          </div>
        </div>

      ))
      ) :
        (<h4>WishList is Empty...</h4>)}

    </Container>
  )
}

export default WishList;