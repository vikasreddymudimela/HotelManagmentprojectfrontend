import React, { useState } from 'react';
import RoomCard from "../rooms/RoomCard";
import RoomPaginator from "../common/RoomPaginator";
import { Button, Row, Col, Card } from 'react-bootstrap';

const RoomSearchresult = ({ results, onClearSearch }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 3;
    const totalResults = results.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const startIdx = (currentPage - 1) * resultsPerPage;
    const endIdx = startIdx + resultsPerPage;
    const paginatedResult = results.slice(startIdx, endIdx);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Card className="mt-4 p-3">
            <Card.Body>
                <Card.Title className="text-center mb-4">Search Results</Card.Title>
                {results.length > 0 ? (
                    <>
                        <Row>
                            {paginatedResult.map((room) => (
                                <Col key={room.id} xs={12} md={4}>
                                    <RoomCard room={room} />
                                </Col>
                            ))}
                        </Row>
                        {totalResults > resultsPerPage && (
                            <Row className="mt-4">
                                <Col className="d-flex justify-content-center">
                                    <RoomPaginator
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                        totalPages={totalPages}
                                    />
                                </Col>
                            </Row>
                        )}
                        <Row className="mt-4">
                            <Col className="d-flex justify-content-center">
                                <Button variant="secondary" onClick={onClearSearch}>
                                    Clear Search
                                </Button>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <div className="text-center mt-5">No Rooms Found</div>
                )}
            </Card.Body>
        </Card>
    );
};

export default RoomSearchresult;
