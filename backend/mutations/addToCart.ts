import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';
import { CartItem } from '../schemas/CartItem';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('adding to cart');
  // 1. query the user to see if they're signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. query the current user's cart
  const allCartItem = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id, quantity',
  });
  const [existingCartItem] = allCartItem;
  // 3. see if the current item is in their cart
  // if it is, increment by 1
  console.log({ existingCartItem });
  console.log({ seshid: sesh.itemId });
  console.log({ productId });
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!}`
    );
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // if not, create a new cart item
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
}
