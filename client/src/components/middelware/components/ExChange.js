import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import LongSpiner from "../../bootstrap/LongSpinner";
import UseProduct from "../../hooks/useProduct";
import { LanguageCtx } from "../../contexts/language";

const ExChange = () => {
  const { id } = useParams()
  const { fetchProduct, product, loading, setLoading } = UseProduct()
  const { language } = useContext(LanguageCtx)
  const translations = require(`../../lang/${language}.json`).exchange;
  useEffect(() => {
    const fetchData = async () => {
      await fetchProduct()
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <LongSpiner />
    )
  }

  return (

    <>
    <h1 className="mt-2 text-center">About</h1>
    <div className="card-deck  d-flex justify-content-center" style={{ margin: "15px 15px" }} >
     
      <div className="card text-center shadow-md " style={{ width: '25rem' }}>
        <img className="card-img-top" style={{ width: "100%", height: 300 }} src={product.filter((p) => {
          return p._id == id
        })[0].image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{product.filter((p) => {
            return p._id == id
          })[0].name}</h5>
          <p className="card-text">{product.filter((p) => {
            return p._id == id
          })[0].description}</p>

          <div className="card-text">
          {translations[0]}:
          </div >
          <div
            className="card-subtitle mb-2 text-muted"
            tag="h6"
          >
            {translations[1]}: {product.filter((p) => {
              return p._id == id
            })[0].client?.name}
          </div>
          <div
            className="card-subtitle mb-2 text-muted"
            tag="h6"
          >
           {translations[2]}: {product.filter((p) => {
              return p._id == id
            })[0].phoneNumber}
          </div>
          <div
            className="card-subtitle mb-2 text-muted"
            tag="h6"
          >
            {translations[3]}:{product.filter((p) => {
              return p._id == id
            })[0].client?.email}
          </div>
          <div
            className="card-subtitle mb-2 text-muted"
            tag="h6"
          >
            {translations[4]}: {product.filter((p) => {
              return p._id == id
            })[0].client?.ville}
          </div>
        </div>
      </div>
    </div>
    </>

  )
}

export default ExChange;