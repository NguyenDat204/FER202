import React, { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import ToastMessage from "../components/ToastMessage";
import { Container, Row, Col, Form } from "react-bootstrap";

const Products = () => {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("default");
    const [toast, setToast] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = !q
            ? products
            : products.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.tags.join(" ").toLowerCase().includes(q)
            );
        if (sort === "price-asc") {
            list = [...list].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sort === "price-desc") {
            list = [...list].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }
        return list;
    }, [query, sort]);

    return (
        <Container>
            <h2 className="mb-3">Products</h2>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        placeholder="Search products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="default">Sort: Default</option>
                        <option value="price-asc">Price ↑</option>
                        <option value="price-desc">Price ↓</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                {filtered.map((p) => (
                    <Col key={p.id} sm={6} md={4} lg={3} className="mb-4 d-flex">
                        <ProductCard product={p} onToast={setToast} />
                    </Col>
                ))}
            </Row>

            <ToastMessage message={toast} onClose={() => setToast("")} />
        </Container>
    );
};

export default Products;
