pragma solidity ^0.4.4;
contract People
{
  Person[] public people;

  struct Person
  {
      bytes32 name;
      bytes32 email;
      uint phone;
      bytes32 petName;
      bytes32 petType;
      uint beaconId;
      bytes32 color;
  }

  function addPerson(bytes32 _name, bytes32 _email, uint _phone, bytes32 _petName, bytes32 _petType, uint _beaconId, bytes32 _color) returns (bool success)
  {
      Person memory newPerson;
      newPerson.name = _name;
      newPerson.email = _email;
      newPerson.phone=_phone;
      newPerson.petName = _petName;
      newPerson.petType = _petType;
      newPerson.beaconId = _beaconId;
      newPerson.color = _color;

      people.push(newPerson);
      return true;
  }

  function getPeople() constant returns (bytes32[], bytes32[], uint[])
  {
      uint length = people.length;
      bytes32[] memory name = new bytes32[] (length);
      bytes32[] memory email = new bytes32[] (length);
      uint[] memory phone = new uint[] (length);

      for(uint i=0;i<length;i++)
      {
        Person memory currentPerson;
        currentPerson = people[i];

        name[i] = currentPerson.name;
        email[i] = currentPerson.email;
        phone[i] = currentPerson.phone;

      }

      return (name, email, phone);
  }

  function getPets() constant returns (bytes32[], bytes32[], uint[],bytes32[])
  {
      uint length = people.length;

      bytes32[] memory petName = new bytes32[] (length);
      bytes32[] memory petType = new bytes32[] (length);
      uint[] memory beaconId = new uint[] (length);
      bytes32[] memory color = new bytes32[] (length);

      for(uint i=0;i<length;i++)
      {
        Person memory currentPerson;
        currentPerson = people[i];

        petName[i] = currentPerson.petName;
        petType[i] = currentPerson.petType;
        beaconId[i] = currentPerson.beaconId;
        color[i] = currentPerson.color;
      }

      return (petName, petType, beaconId, color);
  }

}
