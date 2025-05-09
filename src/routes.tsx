import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Loading } from './components';
// Lazy load components
const Home = lazy(() => import('@/pages'));
const Address = lazy(() => import('@/pages/address/all'));
const AddressDetail = lazy(() => import('@/pages/address/details'));
const Token = lazy(() => import('@/pages/token/all'));
const TokenDetail = lazy(() => import('@/pages/token/details'));
const TokenHolderChart = lazy(() => import('@/pages/token/tokenholderchart'));
const Transactions = lazy(() => import('@/pages/transactions/all'));
const TransactionsDetail = lazy(() => import('@/pages/transactions/detail'));
const About = lazy(() => import('@/pages/about'));
const SNSNeuronsDetails = lazy(() => import('@/pages/sns/neuronDetails'));
const Donate = lazy(() => import('@/pages/donate'));
const SNS = lazy(() => import('@/pages/sns'));
const SNSDetail = lazy(() => import('@/pages/sns/details'));
const SNSTransactions = lazy(() => import('@/pages/sns/transactions'));
const SNSProposals = lazy(() => import('@/pages/sns/proposals'));
const SNSNeurons = lazy(() => import('@/pages/sns/neurons'));
const AiData = lazy(() => import('@/pages/ai-data'));
const AiChat = lazy(() => import('@/pages/ai-chat'));

function AppRoutes() {
  return (
    <Suspense fallback={<Loading loading={true} />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/address" component={Address} />
        <Route exact path="/sns" component={SNS} />
        <Route exact path="/ai-store" component={AiData} />
        <Route exact path="/ai-chat" component={AiChat} />
        <Route exact path="/sns/:id" component={SNSDetail} />
        <Route exact path="/sns/:id/transactions" component={SNSTransactions} />

        <Route exact path="/sns/:id/proposals" component={SNSProposals} />
        <Route exact path="/sns/:id/neurons" component={SNSNeurons} />
        <Route
          exact
          path="/sns/:id/neurons/:neuronsId"
          component={SNSNeuronsDetails}
        />
        <Route exact path="/address/details/:id" component={AddressDetail} />
        <Route exact path="/address/detail/:id" component={AddressDetail} />
        <Route exact path="/token" component={Token} />
        <Route exact path="/token/details/:id" component={TokenDetail} />
        <Route exact path="/token/detail/:id" component={TokenDetail} />
        <Route
          exact
          path="/token/tokenholderchart/:id"
          component={TokenHolderChart}
        />
        <Route exact path="/transactions" component={Transactions} />
        <Route
          exact
          path="/transactions/details/:id"
          component={TransactionsDetail}
        />
        <Route
          exact
          path="/transactions/detail/:id"
          component={TransactionsDetail}
        />
        <Route exact path="/about-ice" component={About} />
        <Route exact path="/sponsor" component={Donate} />
        <Route path="*" render={() => <div>404 Not Found</div>} />
      </Switch>
    </Suspense>
  );
}

export default AppRoutes;
