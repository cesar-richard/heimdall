import React from "react";
import PropTypes from "prop-types";
import { Card, CardDeck, Container, ListGroup, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { getEvents } from "../../api/gill/resources";
import Moment from "react-moment";
import "moment/locale/fr";

export default function SystemHomepage(props) {
  const [loading, setLoading] = React.useState(true);
  const [events, setEvents] = React.useState([]);
  const goTo = React.useCallback(m => window.location.assign(m), []);
  const { system_id } = useParams();
  React.useEffect(
    () =>
      getEvents({ system_id }).then(events => {
        if(1 === events.length) {
          window.location.assign(`/${system_id}/${events[0].id}`);
        } else {
          setEvents(events.data);
          setLoading(false);
        }
      }),
    [system_id]
  );
  return loading ? (
    <Spinner animation='border' role='status' size='sm'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : (
    <Container fluid>
      <CardDeck>
        {events.map(event => {
          return (
            <a key={event.id} href={`/${system_id}/${event.id}`}>
              <Card bg={"ONGOING" === event.status.name ? "success" : ""}>
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>{event.status.title}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <ListGroup variant='flush'>
                      <ListGroup.Item
                        variant={
                          "ONGOING" === event.status.name ? "success" : ""
                        }
                      >
                        From{" "}
                        <Moment format='DD/MM/YYYY HH:mm'>
                          {event.live_start}
                        </Moment>{" "}
                        to{" "}
                        <Moment format='DD/MM/YYYY HH:mm'>
                          {event.live_end}
                        </Moment>
                        <small>
                          (
                          <Moment
                            duration={event.live_start}
                            date={event.live_end}
                          />
                          )
                        </small>
                      </ListGroup.Item>
                      <ListGroup.Item
                        variant={
                          "ONGOING" === event.status.name ? "success" : ""
                        }
                      >
                        Wallet config ({event.walletconfig}) creation{" "}
                        <Moment format='DD/MM/YYYY HH:mm'>
                          {event.walletconfig_created}
                        </Moment>
                        <small>
                          (<Moment fromNow>{event.walletconfig_created}</Moment>
                          )
                        </small>
                      </ListGroup.Item>
                      <ListGroup.Item
                        variant={
                          "ONGOING" === event.status.name ? "success" : ""
                        }
                      >
                        {event.walletconfig_closed ? (
                          <>
                            Wallet config closure
                            <Moment format='DD/MM/YYYY HH:mm'>
                              {event.walletconfig_closed}
                            </Moment>
                            <small>
                              (
                              <Moment fromNow>
                                {event.walletconfig_created}
                              </Moment>
                              )
                            </small>
                          </>
                        ) : (
                          "No wallet closure defined"
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </small>
                </Card.Footer>
              </Card>
            </a>
          );
        })}
      </CardDeck>
    </Container>
  );
}

SystemHomepage.propTypes = {};
