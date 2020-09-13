export function undoRedoPlugin (store) {
    // initialize and save the starting stage   
    // let firstState = JSON.stringify(store.state.profile);
    var ignoredactions = [
      'getAttachmentsloading',
      'getCandidatesloading',
      'getUserProfileRequest',
      'initprofileVariants',
      'getAttachmentsSuccess',
      'undo',
      'getClick',
      'redo',
      'initAssignment',
      'candidateSaved',
      'SaveProfileloading',
      'candidateSavedFalse',
      // 'getProfileSuccess',
      'changeUnsaved',
      'changeTemplateId',
      'getContactPersons',
      // 'changeBrowserLanguage',
      'updateActiveprofileVariant',
      'changeEditormode',
      'setWorkComponentIndex',
      'setEducationComponentIndex',
      'unsetWorkAndEduIndex',
      'checkSkillsIndex',
      'fillAlreadyLoaded',
      'changeStageOver',
      'getActivitiesSuccess',
      'SETDOC', 
    ]
    var jobPostingIgnoredActions = [
      'setLoading',
      'setCandidates',
      'getOrdersSuccess',
      'getJobsSuccess',
      'updateJobPosting',
      'updateJobPostingSuccess',
      'getSalesProductsPackagesSuccess',
      'getSalesProductsRecommendationsSuccess',
      'getSalesProductsSuccess',
      'unpublishOrderSuccess',
      'changeDataProtection',
      'getSalesProductsPackagesSuccess',
      'changePublish',
      'changeStageOver',
      'updateJobFeed',
      'createOrderSuccess',
      'updateOrderSuccess',
    ]
    store.subscribe((mutation, state) => {
      // is called AFTER every mutation
      if(mutation.type.split('/')[0] == "jobPosting" && !jobPostingIgnoredActions.includes(mutation.type.split('/')[1]) && !ignoredactions.includes(mutation.type.split('/')[1])){
        if (mutation.type.split('/')[1] !== 'setJobPosting') {
          store.commit('jobPosting/changeUnsaved');  
        }
      }
      
      if (mutation.type.split('/')[0] == "profile" && !ignoredactions.includes(mutation.type.split('/')[1])) {
        if (mutation.type.split('/')[1] !== 'getProfileSuccess') {
          store.commit('profile/changeUnsaved');  
        }
        if (state.profile.history.length >= 50) {
          state.profile.history.splice(0,1)
        }
        if (state.profile.currentIndex <  state.profile.history.length -1) {
          state.profile.history.splice(state.profile.currentIndex +1)
        }          
        state.profile.history.push(JSON.stringify(store.state.profile.profiles));        
        state.profile.currentIndex++
      }
    });

    // this.store.replaceState(cloneDeep(prevState))
  }




  