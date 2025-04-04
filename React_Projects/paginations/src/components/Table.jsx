import React, { useState, useEffect } from "react";
import {
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Tables = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://fakestoreapi.com/products");

                if (!response.ok) {
                    throw new Error(`HTTPS error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

    const totalPages = Math.ceil(data.length / entriesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <div className="alert alert-danger">Error: {error}</div>
            </Container>
        );
    }

    return (
        <Container fluid className="p-4">
            <Row>
                <Col>
                    <FormGroup className="d-flex align-items-center mb-3">
                        <Label className="me-2">Show entries:</Label>
                        <Input
                            type="select"
                            className="w-auto"
                            value={entriesPerPage}
                            onChange={(e) => {
                                setEntriesPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                        >
                            {[5, 10, 15, 20, 25].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>

                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntries.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            Showing {indexOfFirstEntry + 1} to{" "}
                            {Math.min(indexOfLastEntry, data.length)} of {data.length}{" "}
                            entries
                        </div>

                        <Pagination>
                            <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink first onClick={() => setCurrentPage(1)} />
                            </PaginationItem>
                            <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink previous onClick={handlePreviousPage} />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                (page) => (
                                    <PaginationItem key={page} active={page === currentPage}>
                                        <PaginationLink onClick={() => handlePageChange(page)}>
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )}

                            <PaginationItem disabled={currentPage === totalPages}>
                                <PaginationLink next onClick={handleNextPage} />
                            </PaginationItem>
                            
                            <PaginationItem disabled={currentPage === totalPages}>
                                <PaginationLink
                                    last
                                    onClick={() => setCurrentPage(totalPages)}
                                />
                            </PaginationItem>
                        </Pagination>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Tables;
