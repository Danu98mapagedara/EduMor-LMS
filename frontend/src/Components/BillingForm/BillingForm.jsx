import React from "react";
import "./BillingForm.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import Checkout from '../../Components/Checkout/Checkout';

export default function CreditCard() {
  const { t } = useTranslation();
  return (
    <MDBContainer
      className="py-6 billing-Container"
      style={{ marginTop: "10px" }}
    >
      <MDBRow>
        <MDBCol md="4" className="mb-4">
          <MDBCard
            className="mb-4"
            style={{ borderRadius: "10px", padding: "10px 5px" }}
          >
            <MDBCardHeader
              className="py-3 bg-light"
              style={{ borderRadius: "10px", padding: "10px 5px" }}
            >
              <h5 className="mb-0 align-items-center justify-content-center">
                {t("Payment Summary")}
              </h5>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <span className="package-name">
                    {t("Premium Membership")}
                  </span>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  {t("Products")}
                  <span>Rs. 350.00</span>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  {t("Discount")}
                  <span>Rs. (100.00)</span>
                </MDBListGroupItem>
                <hr className="my-2"></hr>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <div>
                    <strong>{t("Total amount")}</strong>
                    <strong>
                      <p className="mb-0">({t("including VAT")})</p>
                    </strong>
                  </div>
                  <span>
                    <strong>Rs. 250.00</strong>
                  </span>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
            <div className="checkoutButton" style={{margin:"0 auto"}}>
            <Checkout/>
            </div>
          </MDBCard>
          
          {/* notice section */}
        </MDBCol>
        <MDBCol md="4" className="mb-4">
          <MDBCard
            className="mb-4 transparent-card "
            style={{
              borderRadius: "10px",
              padding: "10px 5px",
              border: "2px dashed",
            }}
          >
            <MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <span className="package-name">{t("Notice")}</span>
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 ">
                  <div>
                    <ol>
                    <li>
                        Access to Videos: Successful payment grants immediate
                        access to lecture videos.
                      </li>
                      <li>
                        Payment Obligation: By proceeding with payment, you
                        agree to fulfill your payment obligation.
                      </li>
                      <li>
                        Non-Transferability: Sharing access credentials is
                        strictly prohibited.
                      </li>
                      <li>
                        Technical Requirements: Ensure device compatibility and
                        stable internet connection.
                      </li>
                      <li>
                        Refund Policy: Refunds subject to specified policy.
                        <li>
                          Data Privacy: Your information will be treated
                          confidentially.
                        </li>
                      </li>
                    </ol>
                  </div>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
