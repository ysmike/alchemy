# <img src="https://raw.githubusercontent.com/ysmike/alchemy/master/frontend/public/static/favicon.ico" style="float:left; width:4%; margin-right:10px;"/> Alchemy

An online marketplace where you can browse and search for items, manage cart,
and complete checkout via Stripe. You can view the history of your orders and
even upload items for sale!

<a href="https://alchemy.bond/" target="_blank" >**Check it out!**</a>

## 🎨 Features
- Server-side rendering/routing and client-side caching and state management
- Pagination with customizable number of items displayed per page
- User registration, authentication, permissions, and password reset via email
- Search box that auto-completes and displays results in a selectable dropdown list
- Admin interface to swiftly manage backend data (comprised of `Users`, `Items`, `CartItems`, `Orders`, `OrderItems`, and `Roles`)
- Automatic image upload to Cloudinary

## 🔩 Built With

- [Next.js](https://nextjs.org/) - React web framework for server-side rendering/routing
- [Apollo Client](https://www.apollographql.com/docs/react/) - State management library to manage data with GraphQL
- [Keystone](https://keystonejs.com/) - Headless CMS that facilitates schema creation and provides GraphQL APIs based on schema
  
## 💻 Developers
### To run this app locally:
- Clone this repository:
```
git clone https://github.com/ysmike/alchemy
```

- Install dependencies in both frontend & backend folders
```
cd alchemy/backend && npm i && cd ../frontend && npm i
```

- Add the files that store environment variables in frontend and backend 
- Run the backend server in development mode
```
cd ../backend && npm run dev
```
- Open up a new terminal and run the frontend server in development mode
```
cd ../frontend && npm run dev
```

- The backend Keystone UI should be available in:

```
http://localhost:3000/
```

- The website should be available in:

```
http://localhost:7777/
```