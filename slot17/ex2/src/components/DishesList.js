import React from "react";
import PropTypes from "prop-types";
import DishItem from "./DishItem";
import { Row, Col } from "react-bootstrap";

const DishesList = ({ dishes, search }) => {
  const filtered = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(search.toLowerCase()) ||
      dish.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-4">
      <h2 className="mb-3">Danh sách món ăn</h2>
      <Row>
        {filtered.length > 0 ? (
          filtered.map((dish) => (
            <Col md={3} sm={6} xs={12} key={dish.id} className="mb-4">
              <DishItem dish={dish} />
            </Col>
          ))
        ) : (
          <p>Không tìm thấy món ăn phù hợp</p>
        )}
      </Row>
    </div>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
};

export default DishesList;
