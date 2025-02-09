import React, {Component} from "react";
import {Link, Route} from "react-router-dom";
import styled from "styled-components";
import ProductService from "../../services/ProductService";


class ColDashBoard extends Component {

    constructor(props) {
        super(props)
        this.handlerProductDetail = this.handlerProductDetail.bind(this)
        this.state = {
            currentPage: 1
        }

    }

    handlerProductDetail() {
        console.log(this.props.listProduct)
    }

    handleChangePage = (e, i) => {
        this.props.onPageChange(e);
        this.setState({}, () => {
            this.setState({
                currentPage: i
            })
        })
    }

    handleRemove = (e, id) => {
        e.preventDefault();
        ProductService.removeProduct(id);
        window.location.reload();
    }

    render() {
        return (
            <Div>
                <div className="dash-content">
                    <div className="overview">
                        <div className="title">
                            <i class="fa-solid fa-gauge"></i>
                            <span className="text">DashBoard</span>
                        </div>

                        <div className="boxes">
                            <div className="box box1">
                                <i className="fa-solid fa-thumbs-up"></i>
                                <span className="text">Total text</span>
                                <span className="number">50,120</span>
                            </div>

                            <div className="box box2">
                                <i className="fa-solid fa-share"></i>
                                <span className="text">Share</span>
                                <span className="number">50,120</span>
                            </div>

                            <div
                                onClick={this.handlerProductDetail}
                                className="box box3">
                                <i className="fa-solid fa-comment"></i>
                                <span className="text">Comment</span>
                                <span className="number">50,120</span>
                            </div>


                        </div>
                    </div>

                    <div className="boxes">
                        <div></div>
                        <Link to={"/adminDashBoard/AddProduct"}>
                            <button className={"w3-btn w3-margin "}>Thêm</button>
                        </Link>
                    </div>


                    <div class="table">

                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="col col-1">Id</div>
                                <div className="col col-2">Tên sách</div>
                                <div className="col col-1">Thể loại</div>
                                <div className="col col-3">Tác giả</div>
                                <div className="col col-4">Giá</div>
                                <div className="col col-5">Số lượng</div>
                                <div className="col col-1">Thao tác</div>
                            </li>

                            {
                                this.props.listProduct.map((product) =>
                                    <Link
                                        to={"/adminDashBoard/informationProduct/" + product.id}
                                        class="table-row">
                                        <div className="col col-1" data-label=" Id">{product.id}</div>
                                        <div className="col col-2" data-label="Customer Name">{product.name}</div>
                                        <div className="col col-1" data-label="Amount">{product.categories.name}</div>
                                        <div className="col col-3" data-label="Payment Status">{product.author}</div>
                                        <div className="col col-4" data-label="Amount">{product.price}</div>
                                        <div className="col col-5" data-label="Payment Status">{product.quantity}</div>
                                        <div className="col col-1" data-label="Payment Status">
                                            <button className={"btn-page-selectd"}
                                                    onClick={event => this.handleRemove(event, product.id)}>Xoá
                                            </button>
                                        </div>
                                    </Link>
                                )
                            }
                        </ul>
                    </div>

                    <div className={'pagin'}>
                        {
                            [...Array(this.props.totalPage)].map(
                                (item, i) => {
                                    return <button
                                        className={`${this.state.currentPage === (i + 1) ? "btn-page-selectd " : "btn-page-not-selectd"}`}
                                        value={i + 1}
                                        onClick={event => this.handleChangePage(event, i + 1)}>{i + 1}</button>
                                }
                            )
                        }

                    </div>


                </div>

            </Div>

        )
    }
}

export default ColDashBoard;
const Div = styled.div`
  .dash-content {
    padding-top: 60px;
    font-size: 20px;
    margin-left: 250px;
    width: calc(100% - 250px);
    transition: var(--tran-05);

    .title {
      display: flex;
      align-items: center;
      margin: 70px 0 30px 0;

      i {
        position: relative;
        height: 35px;
        width: 35px;
        background-color: var(--primary-color);
        border-radius: 6px;
        color: var(--title-icon-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      }

      .text {
        font-size: 20px;
        font-weight: 500;
        color: var(--text-color);
        margin-left: 10px;
      }
    }

    .boxes {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 12px;
        width: calc(100% / 3 - 15px);
        padding: 15px 20px;
        background-color: var(--box1-color);

        .text {
          white-space: nowrap;
          font-size: 18px;
          font-weight: 500;
          color: var(--text-color);
        }

        .number {
          font-size: 40px;
          font-weight: 500;
          color: var(--text-color);
        }

        i {
          font-size: 35px;
          color: var(--text-color);
        }
      }

      .box2 {
        background-color: var(--box2-color);
      }

      .box3 {
        background-color: var(--box3-color);
      }
    }

    .table {
      margin-top: 20px;

      .responsive-table {
        li {
          border-radius: 3px;
          padding: 25px 30px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }

        a {
          border-radius: 3px;
          padding: 25px 30px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          text-decoration: none;
          color: #000;
        }

        .table-header {
          background-color: #95A5A6;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .table-row {
          background-color: #ffffff;
          box-shadow: 0px 0px 9px 0px #0c050519;
          cursor: pointer;
        }

        .col-1 {
          flex-basis: 10%;
          border-right: 1px solid #6C7A89;
        }

        .col-2 {
          flex-basis: 25%;
          border-right: 1px solid #6C7A89;

        }

        .col-3 {
          flex-basis: 15%;
          border-right: 1px solid #6C7A89;

        }

        .col-4 {
          flex-basis: 15%;
          border-right: 1px solid #6C7A89;

        }

        .col-5 {
          flex-basis: 20%;
          border-right: 1px solid #6C7A89;

        }

        .col-6 {
          flex-basis: 15%;
        }
      }
    }

    .w3-btn, .w3-example .ws-btn {
      background-color: #4CAF50;
    !important;
      border-radius: 5px;
      font-size: 17px;
      font-family: 'Source Sans Pro', sans-serif;
      padding: 6px 30px;
      color: #FFFFFF;
    }

    .w3-margin {
      margin-top: 16px !important;
    }

    .pagin {
      display: flex;
      justify-content: center;
    }

    .btn-page-not-selectd {
      background-color: white;
      border-color: white;
      margin-left: 16px;
      overflow: hidden; /* for clearfix */
      color: #3b3b3b;
      border-radius: 6px;
      display: block;
    }

    .btn-page-selectd {
      background-color: #bb2d3b;
      border-color: #bb2d3b;
      margin-left: 16px;
      overflow: hidden; /* for clearfix */
      color: white;
      border-radius: 6px;
      display: block;
    }


  }
`;