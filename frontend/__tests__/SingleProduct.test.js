import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';
import { CartStateProvider } from '../lib/cartState';

const product = fakeItem();
const mocks = [
  // when someone requests this query and variable combo
  {
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: {
        id: '123',
      },
    },
    // return this data
    result: {
      data: {
        Product: product,
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: {
        id: '123',
      },
    },
    // return this data
    result: {
      errors: [{ message: 'Item not found!' }],
    },
  },
];

describe('<SingleProduct/>', () => {
  it('renders with proper data', async () => {
    // we need to create some fake data
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={mocks}>
          <SingleProduct id="123" />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByTestId('singleProduct');
    expect(container).toMatchSnapshot();
  });

  it('Errors out when an item is not found', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={errorMocks}>
          <SingleProduct id="123" />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByTestId('graphql-error');
    expect(container).toHaveTextContent('Shoot!');
    expect(container).toHaveTextContent('Item not found!');
  });
});
