export default function CreateForm() {
  return (
    <div>
      <h1>Create Form</h1>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
