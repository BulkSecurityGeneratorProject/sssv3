import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './m-kas.reducer';
import { IMKas } from 'app/shared/model/m-kas.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMKasDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MKasDetail extends React.Component<IMKasDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { mKasEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            MKas [<b>{mKasEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nominal">Nominal</span>
            </dt>
            <dd>{mKasEntity.nominal}</dd>
          </dl>
          <Button tag={Link} to="/entity/m-kas" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/m-kas/${mKasEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ mKas }: IRootState) => ({
  mKasEntity: mKas.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MKasDetail);
