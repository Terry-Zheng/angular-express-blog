module.exports = function(db){
  const blogDB = db.db('Blog');
  var Blogs = blogDB.collection('Blog');

  return {
    findBlog: function(keyword){
      return ;
    },

    createBlog: function(blogContent){

    },

    deleteBlog: function(){

    }
  }
}