import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/customer">
      <Translate contentKey="global.menu.entities.customer" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vip">
      <Translate contentKey="global.menu.entities.vip" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/room">
      <Translate contentKey="global.menu.entities.room" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/room-type">
      <Translate contentKey="global.menu.entities.roomType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/bill">
      <Translate contentKey="global.menu.entities.bill" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/receipt">
      <Translate contentKey="global.menu.entities.receipt" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/payed">
      <Translate contentKey="global.menu.entities.payed" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/storage">
      <Translate contentKey="global.menu.entities.storage" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/sub-bill">
      <Translate contentKey="global.menu.entities.subBill" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/sub-bill-good">
      <Translate contentKey="global.menu.entities.subBillGood" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/card">
      <Translate contentKey="global.menu.entities.card" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/print-info">
      <Translate contentKey="global.menu.entities.printInfo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/booking">
      <Translate contentKey="global.menu.entities.booking" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
