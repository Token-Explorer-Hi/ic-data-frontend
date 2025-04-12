### GitHub tag release

https://github.com/Token-Explorer-Hi/ic-data-frontend/releases/tag/release-1.0.1

### Changelog

#### Major Feature Enhancements

- **Comprehensive Multi-Token Support**:

  - Implemented complete dual-token transaction tracking system
  - Renamed 'Token Symbol' to 'Token0 Symbol' for primary token clarity
  - Renamed 'Token Amount' to 'Token0 Amount' for consistent labeling
  - Repositioned 'Token Fee' to 'Token0 Fee' in the transaction flow
  - Added complete secondary token tracking with 'Token1 Symbol', 'Token1 Amount', and 'Token1 Fee'
  - Enhanced transaction details panel to display both tokens simultaneously

- **Advanced Data Export Capabilities**:
  - Redesigned CSV data generation architecture to support multi-token transactions
  - Implemented sophisticated token value formatting in exports for improved readability
  - Added comprehensive metadata for both tokens in all data exports
  - Optimized export performance for large transaction volumes

#### UI/UX Improvements

- **Enhanced Transaction Visibility**:

  - Added interactive 'Details' action column to token transactions table
  - Implemented expandable transaction rows for deeper insights
  - Redesigned transaction cards with improved information hierarchy

- **Refined Navigation Experience**:
  - Updated pagination system with 25 as default page size for optimal viewing
  - Added flexible page size options (25, 50, 100) for customized browsing
  - Improved table filtering mechanisms for faster data access
  - Enhanced responsive design for better mobile experience

#### Technical Optimizations

- **Framework Updates**:

  - Strategically downgraded React and React DOM from v19.0.0 to v18.3.1 for improved stability
  - Refactored component architecture for better performance
  - Optimized rendering pipeline for transaction-heavy pages

- **Code Quality Improvements**:
  - Restructured component hierarchy for better maintainability
  - Enhanced type definitions throughout the application
  - Improved error handling for transaction processing
  - Updated development configurations for more efficient builds

### Wasm Verification

```
git fetch
git checkout release-1.0.1
dfx build
sha256sum .dfx/ic/canisters/interface/interface.wasm
```
