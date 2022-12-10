import { Link } from "react-router-dom";

export default function BasketItem(props) {
  return (
    <div className="basket_item">
      <Link className="basket_link" to={`/${props.id}`}>
        <div className="basket_img">
          <img src={props.imagePath} alt="basket_item" />
        </div>
        <div className="basket_content">
          <span className="basket_title">{props.name}</span>
          <span>{(props.price).toLocaleString()} USD$</span>
        </div>
      </Link>
    </div>
  );
}
