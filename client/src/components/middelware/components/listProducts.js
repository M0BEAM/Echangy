import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import LongSpiner from "../../bootstrap/LongSpinner";
import { ClientCtx } from "../../contexts/ClientContext";
import UseProduct from "../../hooks/useProduct";
import ReactPaginate from "react-paginate";
import SelectFilter from "../../tailwind/selectFilter";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { LanguageCtx } from "../../contexts/language";
let items = []
const Items = ({ currentItems, translations ,setSelectedPays }) => {
  const { client } = useContext(ClientCtx)
  const { fetchProduct, product, loading, setLoading } = UseProduct()

  const [isOpen, setIsOpen] = useState(false);
  const [wishIcon, setWishIcon] = useState({})
  const [APPURL] = useState(process.env.REACT_APP_APIURL)

  useEffect(() => {
    const fetchData = async () => {
      await fetchProduct()
      setLoading(false)
    }
    fetchData()
    items = product
  }, [])

  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("Iwish" + client?._id))
      setWishIcon(JSON.parse(localStorage.getItem("Iwish" + client?._id)))
  }, [])
  const addToWishList = async (productId, index) => {
    // 
    if (!wishIcon[index] || JSON.parse(localStorage.getItem("Iwish" + client?._id)) === null) {
      console.log("ajouter au wishList")
      setWishIcon({ ...JSON.parse(localStorage.getItem("Iwish" + client?._id)), [index]: true })
      localStorage.setItem("Iwish" + client?._id, JSON.stringify({ ...JSON.parse(localStorage.getItem("Iwish" + client?._id)), [index]: true }))
      await axios.post(APPURL+"wishList", { product: productId, client: client?._id },{
        headers:{
            "X-API-Key":process.env.REACT_APP_APIKEY
        }
    })
    }
    else {
      console.log("supprimer from wishlist")
      setWishIcon({ ...JSON.parse(localStorage.getItem("Iwish" + client?._id)), [index]: null })
      localStorage.setItem("Iwish" + client?._id, JSON.stringify({ ...JSON.parse(localStorage.getItem("Iwish" + client?._id)), [index]: null }))
      await axios.delete(APPURL+"deleteWishList/" + productId + "/" + client._id,{
        headers:{
            "X-API-Key":process.env.REACT_APP_APIKEY
        }
    })
    }

  }



  const handeleExChange = (id) => {
    //localStorage.setItem("resource", "listProduct")
    navigate("/home/device/" + id)
  }
  if (loading) {
    return <LongSpiner />
  }

  return (


    <Container className=" text-center " >
      <h1 className="mt-2">{translations.title}</h1>
      <SelectFilter setSelectedPays={setSelectedPays} options={{ isOpen, setIsOpen }} />
      {currentItems && currentItems.map((item, index) => (

        <div className="card-deck " key={index} style={{ display: "inline-block", margin: "10px 10px" }} >
          <div className="card shadow-md">
            <img className="card-img-top" style={{ width: 250, height: 250 }} src={item.image} alt="Card image cap" />
            <div className="card-body d-flex align-items-center flex-column">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.client.ville}</p>

              <Button color="success" onClick={() => handeleExChange(item._id)}>
                {translations.button}
              </Button>


              <span className="position-absolute bottom-36 cursor-pointer end-28 text-white" onClick={() => { addToWishList(item._id, index); }}>
                {!wishIcon[index] && <AiOutlineHeart size={25} />}

                {wishIcon[index] && <AiFillHeart size={25} />}
              </span>

            </div>
          </div>
        </div>

      ))}
      {!product[0] && (<h4>Devices not Found...</h4>)}
    </Container>


  )
}

export default function ListProduct() {
  const { fetchProduct, product } = UseProduct()
  const { language } = useContext(LanguageCtx)
  const [selectedPays, setSelectedPays] = useState("")
  const translations = require(`../../lang/${language}.json`).home;
  useEffect(() => {
    const fetchData = async () => {
      await fetchProduct()
    }
    fetchData()
  }, [])

  let itemsPerPage = 8
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from other resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = product.filter((item) => { if (selectedPays && selectedPays !== "Tout") { return item.client.ville.toUpperCase() === selectedPays.toUpperCase() } else { return item } }).slice(itemOffset, endOffset);
  const pageCount = Math.ceil(product.length / itemsPerPage);
  console.log(currentItems.length)
  // Invoke when the user clicks to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % product.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} setSelectedPays={setSelectedPays} translations={translations} />
     
        <ReactPaginate
        breakLabel="..."
        nextLabel={translations.pagination[1] + " >"}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={"< " + translations.pagination[0]}
        renderOnZeroPageCount={null}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
    
    </>
  );
}
