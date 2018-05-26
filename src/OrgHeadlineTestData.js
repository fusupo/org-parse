// SIMPLE HEADLINES
module.exports.simpleHL1_str = '* foobar';
module.exports.simpleHL1_obj = {
  type: 'org.headline',
  stars: 1,
  keyword: null,
  priority: null,
  comment: false,
  title: 'foobar',
  tags: null,
  section: null,
  children: null,
  parent: null
};

// HEADLINES WITH DEFAULT KEYWORD
module.exports.keywordHL1_str = '* TODO foobar';
module.exports.keywordHL1_obj = {
  type: 'org.headline',
  stars: 1,
  keyword: 'TODO',
  priority: null,
  comment: false,
  title: 'foobar',
  tags: null,
  section: null,
  children: null,
  parent: null
};

// HEADLINES WITH NON-DEFAULT KEYWORD
module.exports.additionalKeywordHL1_str = '* FILE foobar';
module.exports.additionalKeywordHL1a_obj = {
  type: 'org.headline',
  stars: 1,
  keyword: null,
  priority: null,
  comment: false,
  title: 'FILE foobar',
  tags: null,
  section: null,
  children: null,
  parent: null
};
module.exports.additionalKeywordHL1b_obj = {
  type: 'org.headline',
  stars: 1,
  keyword: 'FILE',
  priority: null,
  comment: false,
  title: 'foobar',
  tags: null,
  section: null,
  children: null,
  parent: null
};

// HEADLINES WITH PRIORITY
module.exports.priorityHL1_str = '* [#A] foobar';
module.exports.priorityHL1_obj = {
  type: 'org.headline',
  stars: 1,
  keyword: null,
  priority: 'A',
  comment: false,
  title: 'foobar',
  tags: null,
  section: null,
  children: null,
  parent: null
};

// HEADLINES WITH COMMENT
module.exports.commentHL1_str = '* COMMENT foobar';
module.exports.commentHL1_obj = {
  type: 'org.headline',
  stars: 1,
  keyword: null,
  priority: null,
  comment: true,
  title: 'foobar',
  tags: null,
  section: null,
  children: null,
  parent: null
};

// HEADLINES WITH TAGS
module.exports.tagHL1_str =
  '* foobar                                                                :bazqux:';
module.exports.tagHL1_obj = {
  type: 'org.headline',
  stars: 1,
  keyword: null,
  priority: null,
  comment: false,
  title: 'foobar',
  tags: ['bazqux'],
  section: null,
  children: null,
  parent: null
};

// HEADLINES WITH CHILDREN
module.exports.childrenHL1_str = '* foobar\n** bazqux';
module.exports.childrenHL1_obj = {
  type: 'org.headline',
  stars: 1,
  keyword: null,
  priority: null,
  comment: false,
  title: 'foobar',
  tags: null,
  section: null,
  children: [
    {
      type: 'org.headline',
      stars: 2,
      keyword: null,
      priority: null,
      comment: false,
      title: 'bazqux',
      tags: null,
      section: null,
      children: null,
      parent: null
    }
  ],
  parent: null
};

// COMPOSITE HEADLINES
module.exports.compositeHL1_str =
  '* TODO [#A] COMMENT foobar                                              :bazqux:';
module.exports.compositeHL1_obj = {
  type: 'org.headline',
  stars: 1,
  keyword: 'TODO',
  priority: 'A',
  comment: true,
  title: 'foobar',
  tags: ['bazqux'],
  section: null,
  children: null,
  parent: null
};
