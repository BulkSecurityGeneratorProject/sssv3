import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './m-plywood.reducer';
import { IMPlywood } from 'app/shared/model/m-plywood.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMPlywoodDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MPlywoodDetail extends React.Component<IMPlywoodDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { mPlywoodEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            MPlywood [<b>{mPlywoodEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="hargaBeli">Harga Beli</span>
            </dt>
            <dd>{mPlywoodEntity.hargaBeli}</dd>
            <dt>
              <span id="qty">Qty</span>
            </dt>
            <dd>{mPlywoodEntity.qty}</dd>
            <dt>
              <span id="qtyProduksi">Qty Produksi</span>
            </dt>
            <dd>{mPlywoodEntity.qtyProduksi}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{mPlywoodEntity.status}</dd>
            <dt>
              <span id="createdOn">Created On</span>
            </dt>
            <dd>
              <TextFormat value={mPlywoodEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>Createdby</dt>
            <dd>{mPlywoodEntity.createdby ? mPlywoodEntity.createdby.login : ''}</dd>
            <dt>Plywoodcategory</dt>
            <dd>{mPlywoodEntity.plywoodcategory ? mPlywoodEntity.plywoodcategory.nama : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/m-plywood" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/m-plywood/${mPlywoodEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ mPlywood }: IRootState) => ({
  mPlywoodEntity: mPlywood.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MPlywoodDetail);
