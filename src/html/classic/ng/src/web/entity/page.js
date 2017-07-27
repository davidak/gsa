/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2017 Greenbone Networks GmbH
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import React from 'react';

import {is_defined} from 'gmp/utils.js';

import PropTypes from '../utils/proptypes.js';

import Toolbar from '../components/bar/toolbar.js';

import Layout from '../components/layout/layout.js';

import Loading from '../components/loading/loading.js';

import IconSizeProvider from '../components/provider/iconsizeprovider.js';

import Section from '../components/section/section.js';

import EntityInfo from './info.js';
import EntityPermissions from './permissions.js';
import EntityTags from './tags.js';

class EntityPage extends React.Component {

  renderToolbarIcons() {
    const {toolBarIcons, entity, ...other} = this.props;

    if (!is_defined(toolBarIcons)) {
      return null;
    }

    return (
      <IconSizeProvider size="medium">
        {React.createElement(toolBarIcons, {entity, ...other})}
      </IconSizeProvider>
    );
  }

  renderSection() {
    const {
      details: Details,
      entity,
      foldable,
      sectionIcon,
      section: SectionComponent = Section,
      title,
      ...other,
    } = this.props;

    if (SectionComponent === false) {
      return null;
    }

    let section_title = title;
    if (is_defined(entity)) {
      section_title = title + ': ' + entity.name;
    }

    return (
      <SectionComponent
        title={section_title}
        className="entity-section"
        img={sectionIcon}
        foldable={foldable}
      >
        <Details
          {...other}
          entity={entity}
        />
      </SectionComponent>
    );
  }

  renderInfo() {
    const {entity} = this.props;
    let InfoComponent = this.props.info;

    if (InfoComponent === false) {
      return null;
    }

    if (!is_defined(InfoComponent)) {
      InfoComponent = EntityInfo;
    }

    return (
      <Layout flex align="end">
        <InfoComponent
          entity={entity}
        />
      </Layout>
    );
  }

  renderUserTags() {
    const {
      entity,
      onAddTag,
      onDeleteTag,
      onDisableTag,
      onEditTagClick,
      onEnableTag,
      onNewTagClick,
    } = this.props;
    let TagsComponent = this.props.tags;

    if (TagsComponent === false) {
      return null;
    }

    if (!is_defined(TagsComponent)) {
      TagsComponent = EntityTags;
    }

    return (
      <TagsComponent
        entity={entity}
        onAddTag={onAddTag}
        onDeleteTag={onDeleteTag}
        onDisableTag={onDisableTag}
        onEditTagClick={onEditTagClick}
        onEnableTag={onEnableTag}
        onNewTagClick={onNewTagClick}
      />
    );
  }

  renderPermissions() {
    const {
      entity,
      permissions,
      onChanged,
      onDownloaded,
      onError,
    } = this.props;
    let PermissionsComponent = this.props.permissionsComponent;

    if (PermissionsComponent === false) {
      return null;
    }

    if (!is_defined(PermissionsComponent)) {
      PermissionsComponent = EntityPermissions;
    }

    return (
      <PermissionsComponent
        entity={entity}
        permissions={permissions}
        onChanged={onChanged}
        onDownloaded={onDownloaded}
        onError={onError}
      />
    );
  }

  render() {
    const {entity, loading} = this.props;

    if (!is_defined(entity)) {
      if (loading) {
        return (
          <Loading loading={loading}/>
        );
      }
      return null;
    }

    return (
      <Layout flex="column">
        <Toolbar>
          {this.renderToolbarIcons()}
        </Toolbar>
        {this.renderInfo()}
        {this.renderSection()}
        {this.renderUserTags()}
        {this.renderPermissions()}
      </Layout>
    );
  }
}

EntityPage.propTypes = {
  details: PropTypes.component,
  entity: PropTypes.model,
  foldable: PropTypes.bool,
  info: PropTypes.componentOrFalse,
  loading: PropTypes.bool,
  permissions: PropTypes.arrayLike,
  permissionsComponent: PropTypes.componentOrFalse,
  sectionIcon: PropTypes.icon,
  section: PropTypes.componentOrFalse,
  tags: PropTypes.componentOrFalse,
  title: PropTypes.string,
  toolBarIcons: PropTypes.component,
  onAddTag: PropTypes.func.isRequired,
  onChanged: PropTypes.func,
  onDownloaded: PropTypes.func,
  onEditTagClick: PropTypes.func.isRequired,
  onEnableTag: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onDeleteTag: PropTypes.func.isRequired,
  onDisableTag: PropTypes.func.isRequired,
  onNewTagClick: PropTypes.func.isRequired,
};

export default EntityPage;

// vim: set ts=2 sw=2 tw=80:
