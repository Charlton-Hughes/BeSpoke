using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeSpoke.Helpers
{
    public class ItemPager
    {
        public ItemPager()
        {
            PageNo = 1;
            PageSize = 15;
        }

        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public string OrderByClause { get; set; }
        public int Start { get; set; }
        public int Length { get; set; }
    }
}