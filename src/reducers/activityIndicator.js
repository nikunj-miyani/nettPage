const initialState = {
  rootLoader: false,
  rootLoaderTitle: '',
  rootLoaderTrue: false
}
const activityIndicator = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_ACTIVITY_INDICATOR_ROOT':
      return { rootLoader: true, rootLoaderTitle: action.text, rootLoaderTrue: action.isTrue }
    case 'HIDE_ACTIVITY_INDICATOR_ROOT':
      return { rootLoader: false, rootLoaderTitle: '', rootLoaderTrue: false }
    default:
      return state
  }
}
export default activityIndicator
