using System.Collections.Generic;
using System.Collections;

namespace dotnetwebapi.Services
{
    public interface IService<T>
    {
        List<T> GetAll();

        T GetById(int id);

        void Add(T newData);

        void Update(int id, T updatedData);

        void Delete(int id);
    }
}