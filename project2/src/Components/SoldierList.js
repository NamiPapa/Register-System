import React, { Component } from "react";
import {
    delSoldier,
    editFetch,
    createFetch,
    resetList,
    getSomeContent,
    getSuperior,
    setPage,
    setType,
    setSearchContent,
    setSort,
    setSuperior,
    addSomeContent
} from "../Redux/action_creaters";
import { connect } from "react-redux";
import { Waypoint } from "react-waypoint";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import avatar1 from "../images/avatar1.jpg";
import avatar2 from "../images/avatar2.jpeg";
import avatar3 from "../images/avatar3.jpeg";
import avatar4 from "../images/avatar4.jpeg";
import avatar5 from "../images/avatar5.png";
import avatar6 from "../images/avatar6.jpeg";
import avatar7 from "../images/avatar7.jpeg";

class SoldierList extends Component {
    componentDidMount() {
        const {
            page,
            sort,
            searchContent,
            type,
            superiorID
        } = this.props;
        this.props.searchSoldier(
            page,
            sort.asc,
            sort.sortby,
            searchContent,
            type,
            superiorID
        );
    }
    handleReset = () => {
        this.props.reset();
    };
    handleCreateSoldier = () => {
        this.props.createStart();
        this.props.history.push("/create");
    };
    handleNameSort = () => {
        const state = this.props;
        if (state.sort.sortby !== "name") {
            this.props.setSort({
                asc: 1,
                sortby: "name"
            });
            this.props.searchSoldier(
                0,
                1,
                "name",
                state.searchContent,
                state.type,
                state.superiorID
            );
        } else {
            this.props.setSort({
                asc: -state.sort.asc,
                sortby: "name"
            });
            this.props.searchSoldier(
                0,
                -state.sort.asc,
                "name",
                state.searchContent,
                state.type,
                state.superiorID
            );
        }
    };
    handleSexSort = () => {
        const state = this.props;
        if (state.sort.sortby !== "sex") {
            this.props.setSort({
                asc: 1,
                sortby: "sex"
            });
            this.props.searchSoldier(
                0,
                1,
                "sex",
                state.searchContent,
                state.type,
                state.superiorID
            );
        } else {
            this.props.setSort({
                asc: -state.sort.asc,
                sortby: "sex"
            });
            this.props.searchSoldier(
                0,
                -state.sort.asc,
                "sex",
                state.searchContent,
                state.type,
                state.superiorID
            );
        }
    };
    handleRankSort = () => {
        const state = this.props;
        if (state.sort.sortby !== "rank") {
            this.props.setSort({
                asc: 1,
                sortby: "rank"
            });
            this.props.searchSoldier(
                0,
                1,
                "rank",
                state.searchContent,
                state.type,
                state.superiorID
            );
        } else {
            this.props.setSort({
                asc: -state.sort.asc,
                sortby: "rank"
            });
            this.props.searchSoldier(
                0,
                -state.sort.asc,
                "rank",
                state.searchContent,
                state.type,
                state.superiorID
            );
        }
    };
    handleStartDateSort = () => {
        const state = this.props;
        if (state.sort.sortby !== "startDate") {
            this.props.setSort({
                asc: 1,
                sortby: "startDate"
            });
            this.props.searchSoldier(
                0,
                1,
                "startDate",
                state.searchContent,
                state.type,
                state.superiorID
            );
        } else {
            this.props.setSort({
                asc: -state.sort.asc,
                sortby: "startDate"
            });
            this.props.searchSoldier(
                0,
                -state.sort.asc,
                "startDate",
                state.searchContent,
                state.type,
                state.superiorID
            );
        }
    };
    handlePhoneSort = () => {
        const state = this.props;
        if (state.sort.sortby !== "phone") {
            this.props.setSort({
                asc: 1,
                sortby: "phone"
            });
            this.props.searchSoldier(
                0,
                1,
                "phone",
                state.searchContent,
                state.type,
                state.superiorID
            );
        } else {
            this.props.setSort({
                asc: -state.sort.asc,
                sortby: "phone"
            });
            this.props.searchSoldier(
                0,
                -state.sort.asc,
                "phone",
                state.searchContent,
                state.type,
                state.superiorID
            );
        }
    };
    handleEmailSort = () => {
        const state = this.props;
        if (state.sort.sortby !== "email") {
            this.props.setSort({
                asc: 1,
                sortby: "email"
            });
            this.props.searchSoldier(
                0,
                1,
                "email",
                state.searchContent,
                state.type,
                state.superiorID
            );
        } else {
            this.props.setSort({
                asc: -state.sort.asc,
                sortby: "email"
            });
            this.props.searchSoldier(
                0,
                -state.sort.asc,
                "email",
                state.searchContent,
                state.type,
                state.superiorID
            );
        }
    };
    handleSuperiorSort = () => {
        const state = this.props;
        if (state.sort.sortby !== "superiorName") {
            this.props.setSort({
                asc: 1,
                sortby: "superiorName"
            });
            this.props.searchSoldier(
                0,
                1,
                "superiorName",
                state.searchContent,
                state.type,
                state.superiorID
            );
        } else {
            this.props.setSort({
                asc: -state.sort.asc,
                sortby: "superiorName"
            });
            this.props.searchSoldier(
                0,
                -state.sort.asc,
                "superiorName",
                state.searchContent,
                state.type,
                state.superiorID
            );
        }
    };
    handleSubNumberSort = () => {
        const state = this.props;
        if (state.sort.sortby !== "subordinate") {
            this.props.setSort({
                asc: 1,
                sortby: "subordinate"
            });
            this.props.searchSoldier(
                0,
                1,
                "subordinate",
                state.searchContent,
                state.type,
                state.superiorID
            );
        } else {
            this.props.setSort({
                asc: -state.sort.asc,
                sortby: "subordinate"
            });
            this.props.searchSoldier(
                0,
                -state.sort.asc,
                "subordinate",
                state.searchContent,
                state.type,
                state.superiorID
            );
        }
    };
    handleSearch = e => {
        e.preventDefault();
        let searchContent = e.target.value;
        this.props.setSearchContent(searchContent);
        this.props.searchSoldier(
            0,
            0,
            "",
            searchContent,
            this.props.type,
            this.props.superiorID
        );
    };
    handleEdit = id => {
        this.props.editStart(id);
        this.props.history.push(`/edit/${id}`);
    };
    handleDelete = id => {
        const { page, sort, search, type, superiorID } = this.props;
        this.props.delSoldier(id, page, sort.asc, sort.sortby, search, type, superiorID);
    };
    handleUpdateSuperior = id => {
        this.props.setType("superior");
        this.props.getSuperior(id);
    };
    handleUpdateSubordinates = id => {
        this.props.setType("directsub");
        this.props.setSuperior(id);
        this.props.searchSoldier(
            0,
            0,
            "",
            this.props.searchContent,
            "directsub",
            id
        );
    };
    handleAddMore = index => {
        if (index === this.props.curList.length - 1) {
            const { page, sort, search, type, superiorID } = this.props;
            this.props.setPage(page + 1);
            this.props.addSoldier(
                page + 1,
                sort.asc,
                sort.sortby,
                search,
                type,
                superiorID
            );
        }
    };
    render() {
        return (
            <div>
                <div>{this.props.error ? this.props.error : null}</div>
                <h2 style={{ padding: "10px" }}>US Army Personal Registry</h2>
                <div>
                    <div style={{ padding: "10px" }}>
                        <input
                            onChange={this.handleSearch}
                            placeholder="search"
                        />
                    </div>
                    <div>
                        <Button onClick={this.handleReset} color="primary">
                            Reset
                        </Button>
                        <Button
                            onClick={this.handleCreateSoldier}
                            color="primary"
                        >
                            New Soldier
                        </Button>
                    </div>
                </div>
                <div>
                    <Paper style={{ width: "100%" }}>
                        <div style={{ maxHeight: 440, overflow: "auto" }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ minWidth: 170 }}>
                                            Avatar
                                        </TableCell>
                                        <TableCell
                                            onClick={this.handleNameSort}
                                        >
                                            Name
                                        </TableCell>
                                        <TableCell onClick={this.handleSexSort}>
                                            Sex
                                        </TableCell>
                                        <TableCell
                                            onClick={this.handleRankSort}
                                        >
                                            Rank
                                        </TableCell>
                                        <TableCell
                                            onClick={this.handleStartDateSort}
                                        >
                                            Start Date
                                        </TableCell>
                                        <TableCell
                                            onClick={this.handlePhoneSort}
                                        >
                                            Phone
                                        </TableCell>
                                        <TableCell
                                            onClick={this.handleEmailSort}
                                        >
                                            Email
                                        </TableCell>
                                        <TableCell
                                            onClick={this.handleSuperiorSort}
                                        >
                                            Superior
                                        </TableCell>
                                        <TableCell
                                            onClick={this.handleSubNumberSort}
                                        >
                                            # of D.S.
                                        </TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Delete</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.curList.map((item, index) => {
                                        let avatar = avatar1;
                                        switch (item.avatar) {
                                            case "C:\\fakepath\\avatar1.jpg":
                                                avatar = avatar1;
                                                break;
                                            case "C:\\fakepath\\avatar2.jpeg":
                                                avatar = avatar2;
                                                break;
                                            case "C:\\fakepath\\avatar3.jpeg":
                                                avatar = avatar3;
                                                break;
                                            case "C:\\fakepath\\avatar4.jpeg":
                                                avatar = avatar4;
                                                break;
                                            case "C:\\fakepath\\avatar5.png":
                                                avatar = avatar5;
                                                break;
                                            case "C:\\fakepath\\avatar6.jpeg":
                                                avatar = avatar6;
                                                break;
                                            case "C:\\fakepath\\avatar7.jpeg":
                                                avatar = avatar7;
                                                break;
                                            default:
                                                avatar = avatar1;
                                        }
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                                id={index}
                                            >
                                                <TableCell>
                                                    <img
                                                        src={avatar}
                                                        alt="null"
                                                        height="100px"
                                                        width="100px"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {item.name}
                                                </TableCell>
                                                <TableCell>
                                                    {item.sex}
                                                </TableCell>
                                                <TableCell>
                                                    {item.rank}
                                                </TableCell>
                                                <TableCell>
                                                    {item.startDate}
                                                </TableCell>
                                                <TableCell>
                                                    <a
                                                        href={`tel:${item.phone}`}
                                                    >
                                                        {item.phone}
                                                    </a>
                                                </TableCell>
                                                <TableCell>
                                                    <a
                                                        href={`mailTo:${item.email}`}
                                                    >
                                                        {item.email}
                                                    </a>
                                                </TableCell>
                                                {item.superiorID ? (
                                                    <TableCell
                                                        onClick={() =>
                                                            this.handleUpdateSuperior(
                                                                item.superiorID
                                                            )
                                                        }
                                                    >
                                                        {item.superiorName}
                                                    </TableCell>
                                                ) : (
                                                    <TableCell />
                                                )}

                                                {item.directSubordinates
                                                    .length ? (
                                                    <TableCell
                                                        onClick={() =>
                                                            this.handleUpdateSubordinates(
                                                                item._id
                                                            )
                                                        }
                                                    >
                                                        {
                                                            item
                                                                .directSubordinates
                                                                .length
                                                        }
                                                    </TableCell>
                                                ) : (
                                                    <TableCell />
                                                )}
                                                <TableCell>
                                                    <Button
                                                        onClick={() =>
                                                            this.handleEdit(
                                                                item._id
                                                            )
                                                        }
                                                    >
                                                        <EditIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={() =>
                                                            this.handleDelete(
                                                                item._id
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    {this.props.hasNext && (
                                                        <Waypoint
                                                            onEnter={() =>  
                                                                    this.handleAddMore(
                                                                        index
                                                                    )
                                                            }
                                                        />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <div>
                                {this.props.isFetching ? "loading..." : null}
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    page: state.list.page,
    type: state.list.listType,
    searchContent: state.list.searchContent,
    sort: state.list.sort,
    superiorID: state.list.superiorID,
    hasNext: state.list.hasNext,
    curList: state.list.curList,
    isFetching: state.list.isFetching,
    error: state.list.error
});

const mapDispatchToProps = dispatch => ({
    editStart: id => dispatch(editFetch(id)),
    setPage: page => dispatch(setPage(page)),
    setType: type => dispatch(setType(type)),
    setSearchContent: searchContent =>
        dispatch(setSearchContent(searchContent)),
    setSort: sort => dispatch(setSort(sort)),
    setSuperior: superiorID => dispatch(setSuperior(superiorID)),
    getSuperior: id => dispatch(getSuperior(id)),
    createStart: () => dispatch(createFetch()),
    reset: () => dispatch(resetList()),
    delSoldier: (id, page, sort, sortby, searchContent, type, superiorID) =>
        dispatch(
            delSoldier(id, page, sort, sortby, searchContent, type, superiorID)
        ),
    addSoldier: (page, sort, sortby, searchContent, type, superiorID) =>
        dispatch(
            addSomeContent(page, sort, sortby, searchContent, type, superiorID)
        ),
    searchSoldier: (page, sort, sortby, searchContent, type, superiorID) =>
        dispatch(
            getSomeContent(page, sort, sortby, searchContent, type, superiorID)
        )
});

export default connect(mapStateToProps, mapDispatchToProps)(SoldierList);
