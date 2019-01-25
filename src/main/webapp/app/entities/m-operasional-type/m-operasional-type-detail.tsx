import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './m-operasional-type.reducer';
import { IMOperasionalType } from 'app/shared/model/m-operasional-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMOperasionalTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MOperasionalTypeDetail extends React.Component<IMOperasionalTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { mOperasionalTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            MOperasionalType [<b>{mOperasionalTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nama">Nama</span>
            </dt>
            <dd>{mOperasionalTypeEntity.nama}</dd>
            <dt>
              <span id="deskripsi">Deskripsi</span>
            </dt>
            <dd>{mOperasionalTypeEntity.deskripsi}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{mOperasionalTypeEntity.status}</dd>
            <dt>
              <span id="createdOn">Created On</span>
            </dt>
            <dd>
              <TextFormat value={mOperasionalTypeEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>Createdby</dt>
            <dd>{mOperasionalTypeEntity.createdby ? mOperasionalTypeEntity.createdby.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/m-operasional-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/m-operasional-type/${mOperasionalTypeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ mOperasionalType }: IRootState) => ({
  mOperasionalTypeEntity: mOperasionalType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MOperasionalTypeDetail);
