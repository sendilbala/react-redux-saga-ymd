import React from 'react';
import uid from 'nanoid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import treeChanges from 'tree-changes';
import {
  ButtonGroup,
  Button,
  Flex,
  Heading,
  Link,
  Image,
  Paragraph,
  theme,
  utils,
} from 'styled-minimal';
import Truncate from 'react-truncate';


import { appColor } from '../modules/theme';
import { getRepos, showAlert, switchMenu } from '../actions';
import { STATUS } from '../constants/index';
import Loader from './Loader';

const { responsive, spacer } = utils;
const { grays } = theme;

const CardGrid = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${spacer(2)};
  grid-template-columns: 100%;
  list-style: none;
  margin: ${spacer(4)} auto 0;
  padding: 0;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      ix: `
        grid-gap: ${spacer(3)(p)};
        width: 90%;
      `,
      md: `
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
      `,
      lg: `
        grid-template-columns: repeat(3, 1fr);
      `,
      xl: `
        grid-gap: ${spacer(4)(p)};
        grid-template-columns: repeat(4, 1fr);
      `,
    })};
  /* stylelint-enable */

  > li {
    display: flex;
  }
`;

const Item = styled(Link)`
  align-items: center;
  border: solid 0.1rem ${appColor};
  border-radius: 0.4rem;
  overflow: hidden;
  padding: ${spacer(3)};
  text-align: left;
  width: 100%;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      md: `
        padding: ${spacer(3)(p)};
      `,
      lg: `
        padding: ${spacer(4)(p)};
      `,
    })};
  /* stylelint-enable */

  p {
    color: #000;
  }

  img {
    height: 8rem;
    margin-bottom: ${spacer(2)};
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacer(3)};

  small {
    color: ${grays.gray60};
  }
`;

export class Conditions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: 'react',
    };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    conditions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { query } = this.state;
    const { dispatch } = this.props;

    dispatch(getRepos(query));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, conditions } = this.props;
    const { changedTo } = treeChanges(prevProps, this.props);

    if (changedTo('conditions.repos.status', STATUS.ERROR)) {
      dispatch(showAlert(conditions.repos.message, { variant: 'danger' }));
    }
  }

  handleClick = e => {
    const { query } = e.currentTarget.dataset;
    const { dispatch } = this.props;

    this.setState({
      query,
    });

    dispatch(switchMenu(query));
  };

  render() {
    const { query } = this.state;
    const { conditions } = this.props;
    const data = conditions.repos.data[query] || [];
    const altImageUrl = 'https://www.your.md/static/images/shared/your_md_full_logo.svg';
    let output;

    if (conditions.repos.status === STATUS.SUCCESS) {
      if (data.length) {
        output = (
          <CardGrid data-type={query} data-testid="conditionsGrid">
            {conditions.repos.data[query].map(d => (
              <li key={uid()}>
                <Item href='#' target="_blank">
                  { <Image src={d.image ? d.image : altImageUrl} alt='image' onError={(e) => {
                      e.target.src = altImageUrl //replacement image imported above
                   }} />}
                  {d.label && <ItemHeader>
                    <Heading as="h5" lineHeight={1}>
                      {d.label}
                    </Heading>
                  </ItemHeader> }
                  { d.snippet && <Paragraph><Truncate lines={2} >
                    {d.snippet}
                  </Truncate> </Paragraph>}
                </Item>
              </li>
            ))}
          </CardGrid>
        );
      } else {
        output = <h3>Nothing found</h3>;
      }
    } else {
      output = <Loader block />;
    }

    return (
      <div key="conditions" data-testid="conditionsWrapper">
        
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { conditions: state.conditions };
}

export default connect(mapStateToProps)(Conditions);
