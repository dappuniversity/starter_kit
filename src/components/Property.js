import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
function Property({ property }) {
   
    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
                <Card.Title>{property._propertyAddress}</Card.Title>
                <Card.Text>
                    {property._city}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{property._room}</ListGroupItem>
                <ListGroupItem>{property._area}</ListGroupItem>
                <ListGroupItem>{property._priceInEther}</ListGroupItem>
                <ListGroupItem>{property._propertyType}</ListGroupItem>
                <ListGroupItem>{property._propertyType}</ListGroupItem>
                <ListGroupItem>{property._saleStatus}</ListGroupItem>
            </ListGroup>

        </Card>
    )
}

export default Property;