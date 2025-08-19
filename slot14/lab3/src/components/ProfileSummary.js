import React from "react";
import { Modal, Card, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function ProfileSummary({ show, onHide, profile }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>🎓 Profile Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card border="0">
          <Card.Body>
            <Row className="align-items-center mb-3">
              <Col md={3} className="text-center">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="avatar"
                    className="rounded-circle"
                    width="120"
                    height="120"
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                    style={{ width: "120px", height: "120px", color: "white" }}
                  >
                    No Avatar
                  </div>
                )}
              </Col>
              <Col md={9}>
                <h5 className="fw-bold">{profile.about?.name || "N/A"}</h5>
                <p className="mb-1 text-muted">{profile.about?.email || "N/A"}</p>
                <p className="mb-0">
                  <b>Username:</b> {profile.account?.username || "N/A"}
                </p>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col md={6}>
                <p>
                  <b>Secret Question:</b> {profile.account?.question || "N/A"}
                </p>
                <p>
                  <b>Answer:</b> {profile.account?.answer || "N/A"}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <b>Country:</b> {profile.address?.country || "N/A"}
                </p>
                <p>
                  <b>City:</b> {profile.address?.city || "N/A"}
                </p>
                <p>
                  <b>Street:</b> {profile.address?.street || "N/A"}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ProfileSummary.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default ProfileSummary;
